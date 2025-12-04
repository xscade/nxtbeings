import { NextRequest, NextResponse } from "next/server";

const RETELL_API_KEY = process.env.RETELL_AI_API_KEY || "key_e7471f8292959ba9fd201f025e51";
const RETELL_AGENT_ID = process.env.RETELL_AI_AGENT_ID || "agent_7a877e6da78743de2cbb9ddee3";
const RETELL_PHONE_NUMBER = process.env.RETELL_AI_PHONE_NUMBER || "+14025264321";
const RETELL_API_BASE_URL = "https://api.retellai.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      teamSize,
      industry,
      domains,
      requirements,
    } = body;

    // Validation
    if (!companyName || !contactName || !email || !phone || !teamSize || !industry) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!domains || domains.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one domain" },
        { status: 400 }
      );
    }

    // Format phone number (ensure it starts with +)
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith("+")) {
      // If it doesn't start with +, assume US number and add +1
      formattedPhone = formattedPhone.replace(/\D/g, ""); // Remove all non-digits
      if (formattedPhone.length === 10) {
        formattedPhone = `+1${formattedPhone}`;
      } else if (formattedPhone.length === 11 && formattedPhone.startsWith("1")) {
        formattedPhone = `+${formattedPhone}`;
      } else {
        formattedPhone = `+${formattedPhone}`;
      }
    }

    // Prepare dynamic variables for Retell AI
    // Retell AI uses "retell_llm_dynamic_variables" to pass context to the agent
    // These variables will be available in the agent's prompt via {{variable_name}} syntax
    const retellLlmDynamicVariables = {
      company_name: companyName,
      contact_name: contactName,
      email: email,
      phone: formattedPhone,
      team_size: teamSize,
      industry: industry,
      domains: Array.isArray(domains) ? domains.join(", ") : domains,
      requirements: requirements || "No specific requirements mentioned",
      submission_time: new Date().toLocaleString(),
    };

    // Create a formatted context summary for better agent understanding
    const contextSummary = `
Company: ${companyName}
Contact: ${contactName} (${email})
Industry: ${industry}
Team Size: ${teamSize}
Areas of Interest: ${Array.isArray(domains) ? domains.join(", ") : domains}
${requirements ? `Requirements: ${requirements}` : ""}
    `.trim();

    // Call Retell AI API to create a phone call
    // Reference: https://docs.retellai.com/api-references/create-phone-call
    // Using REST API directly for more control and reliability
    const retellApiUrl = `${RETELL_API_BASE_URL}/create-phone-call`;
    
    const requestBody = {
      agent_id: RETELL_AGENT_ID,
      from_number: RETELL_PHONE_NUMBER,
      to_number: formattedPhone,
      // Pass form data as dynamic variables - these will be available in the agent's prompt
      // The agent can access these via {{variable_name}} in the prompt
      retell_llm_dynamic_variables: retellLlmDynamicVariables,
      // Optional: Add metadata for tracking
      metadata: {
        source: "upskill_consultation_form",
        submitted_at: new Date().toISOString(),
      },
    };

    const retellResponse = await fetch(retellApiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!retellResponse.ok) {
      const errorData = await retellResponse.text();
      console.error("Retell AI API Error:", errorData);
      throw new Error(`Retell AI API error: ${errorData}`);
    }

    const phoneCallResponse = await retellResponse.json();

    // Store the consultation request in database (optional)
    // You can create a Consultation model to track submissions

    return NextResponse.json({
      success: true,
      message: "Consultation request submitted successfully. Our AI agent will call you shortly.",
      call_id: phoneCallResponse.call_id,
      phone: formattedPhone,
      call_status: phoneCallResponse.call_status,
    });
  } catch (error) {
    console.error("Error creating consultation call:", error);
    return NextResponse.json(
      { 
        error: "Failed to process consultation request",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

