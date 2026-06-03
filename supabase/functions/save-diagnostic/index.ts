import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Guard against oversized payloads (256 KB)
    const contentLength = Number(req.headers.get("content-length") ?? "0");
    if (contentLength > 256 * 1024) {
      return new Response(JSON.stringify({ error: "Payload too large" }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const rawText = await req.text();
    if (rawText.length > 256 * 1024) {
      return new Response(JSON.stringify({ error: "Payload too large" }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const body = JSON.parse(rawText);
    const {
      user_email,
      company_name,
      answers,
      final_answer,
      category_scores,
      global_score,
    } = body ?? {};

    const bad = (msg: string) =>
      new Response(JSON.stringify({ error: msg }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    if (!Array.isArray(answers) || !Array.isArray(category_scores) || typeof global_score !== "number") {
      return bad("Invalid payload");
    }
    if (answers.length > 100 || category_scores.length > 100) {
      return bad("Too many items");
    }
    for (const a of answers) {
      if (a && typeof a === "object" && typeof (a as any).text === "string" && (a as any).text.length > 1000) {
        return bad("Answer text too long");
      }
    }
    if (!Number.isFinite(global_score) || global_score < 0 || global_score > 10) {
      return bad("Invalid global_score");
    }
    if (final_answer != null) {
      if (typeof final_answer !== "string" || final_answer.length > 2000) {
        return bad("Invalid final_answer");
      }
    }
    if (user_email && (typeof user_email !== "string" || user_email.length > 320)) {
      return bad("Invalid email");
    }
    if (company_name && (typeof company_name !== "string" || company_name.length > 200)) {
      return bad("Invalid company");
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
