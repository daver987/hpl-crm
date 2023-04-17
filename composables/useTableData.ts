interface UseTableDataOptions<T> {
  queryKey: string[]
  queryFn: () => Promise<T>
}

export async function useTableData<T>(options: UseTableDataOptions<T>) {
  const {
    data: tableData,
    suspense: tableDataSuspense,
    isLoading,
    refetch: updateTableData,
  } = useQuery({
    queryKey: options.queryKey,
    queryFn: options.queryFn,
  })

  onServerPrefetch(async () => {
    await tableDataSuspense()
  })

  if (!tableData.value) {
    await updateTableData()
  }

  const data: Ref<typeof tableData.value> = computed(() => tableData.value)

  // const data = computed(() => tableData.value)

  return {
    data,
    isLoading,
    updateTableData,
  }
}
