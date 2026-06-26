const BASE_URL ="https://streamed.pk/api";
const API_SPORT="/sports"; //sport id to filter the matches by category
const API_MATCHES="/matches"
//matches api endpoints 
//  category-id
//  category-id/popular
//  all
//  all/popular
//  all-today
//  all-today/popular
//  live
//  live/popular
//
//
//=====================
//
//call match api first get the unique source id : source identifier also there(alpha bravo etc)? and the id  
const API_STREAM="/stream";
//
//const API_IMAGES=`/images/${badge}/${id}.webp`;
//=====================
//steps 
//=====================
//1-first get the sports category to filter out the noise
//2 -using the matches api you can specify the category
//3-

async function getcategory(){
 try{ console.log("hi from da function...")
const response = await fetch(`${BASE_URL}${API_SPORT}`);
const data= await  response.json();
for (const category of data){
console.log(category.id);
   const match = await (await fetch(`${BASE_URL}${API_MATCHES}/${category.id}`)).json();
   for (const matches of match){
      console.log(`\n${matches.title}`);
      for (const sources  of matches.sources){
       let m_source=sources.source;
       let id=sources.id;
   const stream= await (await fetch (`${BASE_URL}${API_STREAM}/${m_source}/${id}`)).json();
         for(const streams of stream){
        /*    console.log(`\n${streams.streamNo}`);
            console.log(streams.language);
            console.log(`\n${streams.source}`);*/
  //          const html = await fetch(streams.embedUrl).then(r => r.text());
//console.log(html.slice(0, 1000));
       const embed =streams.embedUrl;
         }


      }
   }
 }
 } catch(e){console.error(e);}
}

async function getlivematches(){
  const match = await (await fetch ("https://streamed.pk/api/matches/live")).json();
for (const matches of match){
  console.log(matches.title);
  console.log(`\n`);
for (const source of matches.sources){
let lsource=source.source;
  let id =source.id;
  console.log(`${id}`)
const data = await (await fetch(`https://streamed.pk/api/stream/${lsource}/${id}`)).json();
  for (dt of data){
//console.log(dt.embedUrl)
    console.log(JSON.stringify(data, null, 2));
  }
}
}
}
getcategory();
