export function useHomepageSections() {
  // Всегда возвращаем true для видимости всех секций
  const isSectionVisible = (): boolean => true

  return {
    sectionsConfig: {},
    loading: false,
    error: null,
    isSectionVisible,
    refetch: async () => {}
  }
} 