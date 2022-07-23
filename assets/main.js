//import fetch from "node-fetch";

const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC0Kj5Kr1DjdAmt7adScltMw&part=snippet%2Cid&order=date&maxResults=50';
//referencia al elemento del HTML
const content = null || document.getElementById('content');


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '07fabd8e28msh00156098fce0f5cp16f18ejsnd1a3503a5362',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlAPi){
    //Ejecutamos la peticiacion a la API
    const response = await fetch(urlAPi, options);
    //Transformamos la informacion para que nos entregue un objeto
    const data = await response.json();
    return data;
}

//funcion que se invoca asi misma
// Funcion anonima
//cuando cargue el archivo se va a ejecutar

(async () => {
    try{
        const videos = await fetchData(API);
         //crearemos un template en html para que itere por los elementos de la respuesta
        //view es esa porcion de html
        //usamos js para iterar
        //en esta API , para acceder a los videos, se refiere a items, se hace un map para devolver un nuevo arreglo con el template por cada resultado
        let view = `
        ${videos.items.map(video => `
        <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>

        `).slice(0,4).join('')}
        `;
         //para iterar solo 4 videos
        content.innerHTML = view;
    }catch (error){
        console.log(error);
    }
})();
