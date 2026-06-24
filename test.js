async function getmaches(){
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
getmaches();
