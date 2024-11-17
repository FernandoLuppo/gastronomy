export const handleErrors = ({
  err,
  errorMessage
}: {
  err: unknown
  errorMessage?: string
}): { error: string; success: boolean } => {
  console.error(`${errorMessage}: ${err}`)

  return {
    error: err instanceof Error ? err.message : 'An unknown error occurred',
    success: false
  }
}
