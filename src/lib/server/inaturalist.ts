export const getObservations = async (queryString: string) => {
	const res = await fetch(`https://api.inaturalist.org/v1/observations${queryString}`);
	if (!res.ok) {
		throw new Error(`Response status: ${res.status}`);
	}

	const json = await res.json();

	console.log(Object.keys(json));
	for (const observation of json['results']) {
		console.log(observation.photos);
	}
};
