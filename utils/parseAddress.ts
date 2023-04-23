export function parseAddress(formattedAddress: string) {
	const parts = formattedAddress.split(', ')

	const country = parts.pop()
	let city, region, postalCode

	const regionPostalCodeString = parts.pop()
	const regionPostalCode = regionPostalCodeString.match(
		/([a-zA-Z]+)(\s+\w+\s*\w*)?/
	)

	if (regionPostalCode) {
		region = regionPostalCode[1]
		postalCode = regionPostalCode[2]?.trim() || null
	} else {
		region = null
		postalCode = null
	}

	city = parts.pop()

	let street1 = null
	let street2 = null

	if (parts.length > 0) {
		street1 = parts.shift()

		if (parts.length > 0) {
			street2 = parts.join(', ')
		}
	}

	return {
		street1: street1 || null,
		street2: street2 || null,
		city: city || null,
		region: region || null,
		postalCode: postalCode || null,
		country: country || null,
		displayAddress: formattedAddress,
		geoLookupAddress: null,
		cityRegionPostalCode: null,
	}
}
