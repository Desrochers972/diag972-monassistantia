-- Remove overly permissive public policies on diagnostics
DROP POLICY IF EXISTS "Anyone can read diagnostics" ON public.diagnostics;
DROP POLICY IF EXISTS "Anyone can update diagnostics" ON public.diagnostics;
DROP POLICY IF EXISTS "Anyone can insert diagnostics" ON public.diagnostics;

-- Revoke direct anon access; all reads/writes go through edge functions (service_role)
REVOKE ALL ON public.diagnostics FROM anon;
REVOKE ALL ON public.diagnostics FROM authenticated;
GRANT ALL ON public.diagnostics TO service_role;

-- RLS stays enabled; no policies = no direct access from client. Edge functions use service_role and bypass RLS.
ALTER TABLE public.diagnostics ENABLE ROW LEVEL SECURITY;