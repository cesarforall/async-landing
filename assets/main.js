const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCzoVCacndDCfGDf41P-z0iA&part=snippet%2Cid&order=date&maxResults=50';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9d0f41e794msh6502a15982e8fe1p1dd14ajsn7b8007af8d4d',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
	},
};

async function fetchData(urlApi) {
	const response = await fetch(urlApi, options);
	const data = await response.json();
	return data;
}

(async () => {
	try {
		const videos = await fetchData(API);
		let view = `
    ${videos.items
					.map(
						video => `
        <div class="group relative">
            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span> ${video.snippet.title}
                </h3>
            </div>
        </div>
    `,
					)
					.slice(0, 4)
					.join('')}
    `;
		content.innerHTML = view;
	} catch (error) {
		alert('😔 Ha habido un error. Refresca la página para intentarlo de nuevo.');
		console.log(error);
	}
})();
