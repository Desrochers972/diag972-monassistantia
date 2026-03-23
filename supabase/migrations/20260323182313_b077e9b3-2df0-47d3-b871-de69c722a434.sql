-- Create table for storing diagnostic results
CREATE TABLE public.diagnostics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT,
  company_name TEXT,
  answers JSONB NOT NULL,
  final_answer TEXT,
  category_scores JSONB NOT NULL,
  global_score NUMERIC(4,1) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.diagnostics ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (no auth required for this public diagnostic tool)
CREATE POLICY "Anyone can insert diagnostics"
  ON public.diagnostics
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow reading own diagnostic by id
CREATE POLICY "Anyone can read diagnostics"
  ON public.diagnostics
  FOR SELECT
  TO anon
  USING (true);