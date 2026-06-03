import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const {
      user_email,
      company_name,
      answers,
      final_answer,
      category_scores,
      global_score,
    } = body ?? {};

    // Minimal validation
    if (!Array.isArray(answers) || !Array.isArray(category_scores) || typeof global_score !== "number") {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (user_email && (typeof user_email !== "string" || user_email.length > 320)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (company_name && (typeof company_name !== "string" || company_name.length > 200)) {
      return new Response(JSON.stringify({ error: "Invalid company" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Generate an edit token returned to the client (used to allow updating own row only)
    const editToken = crypto.randomUUID();

    const { data, error } = await supabase
      .from("diagnostics")
      .insert({
        user_email: user_email || null,
        company_name: company_name || null,
        answers,
        final_answer: final_answer || null,
        category_scores,
        global_score,
        wants_consultant_rdv: false,
        edit_token: editToken,
      } as any)
      .select("id")
      .single();

    if (error) {
      console.error("save-diagnostic insert error", error);
      return new Response(JSON.stringify({ error: "Save failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ id: (data as any).id, edit_token: editToken }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("save-diagnostic error", e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
