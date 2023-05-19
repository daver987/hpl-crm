import { reactive, computed, ComputedRef } from 'vue'
import {
	isBefore,
	isAfter,
	parseISO,
	endOfDay,
	startOfDay,
	isSameDay,
	isToday,
	startOfMonth,
	endOfMonth,
	getUnixTime,
} from 'date-fns'

interface DataItem {
	totalCharges: number
	scheduledPickupTime: string
}

export function useFilteredDataCalculation(
	fetchData: () => Promise<DataItem[]>
) {
	const state = reactive({
		data: null,
		range: [
			getUnixTime(startOfMonth(new Date())) * 1000,
			getUnixTime(endOfMonth(new Date())) * 1000,
		],
		startDate: null,
		endDate: null,
	})

	const loadData = async () => {
		state.data = await fetchData()
		state.startDate = state.range ? startOfDay(new Date(state.range[0])) : null
		state.endDate = state.range ? endOfDay(new Date(state.range[1])) : null
	}

	const filteredData: ComputedRef<DataItem[]> = computed(() => {
		if (!state.startDate || !state.endDate) {
			return []
		}
		return state.data.filter((item) => {
			let itemDate = parseISO(item.scheduledPickupTime)
			return (
				(isAfter(itemDate, state.startDate) ||
					isSameDay(itemDate, state.startDate)) &&
				(isBefore(itemDate, state.endDate) ||
					isSameDay(itemDate, state.endDate))
			)
		})
	})

	const totalCharges: ComputedRef<number> = computed(() => {
		return (
			filteredData.value.reduce(
				(total: number, item) => total + item.totalCharges,
				0
			) || 0
		)
	})

	const itemCount: ComputedRef<number> = computed(() => {
		return filteredData.value.length || 0
	})

	const todayItemCount: ComputedRef<number> = computed(() => {
		return (
			filteredData.value.filter((item) =>
				isToday(parseISO(item.scheduledPickupTime))
			).length || 0
		)
	})

	const averageCharge: ComputedRef<number> = computed(() => {
		return itemCount.value > 0 ? totalCharges.value / itemCount.value : 0
	})

	loadData()

	return {
		state,
		loadData,
		filteredData,
		totalCharges,
		itemCount,
		todayItemCount,
		averageCharge,
	}
}
