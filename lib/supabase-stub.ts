// Lightweight stub for '@supabase/supabase-js' to avoid build-time module resolution errors
// All usages should be removed; this exists as a safety net only.
export function createClient(..._args: any[]) {
  return {
    from: () => ({ select: () => ({ data: null, error: { message: 'supabase-removed' } }) }),
    rpc: async () => ({ data: null, error: { message: 'supabase-removed' } }),
    storage: { from: () => ({ getPublicUrl: () => ({ data: { publicUrl: '' } }) }) },
  } as any
}
