async function getcategory(){
  const categories = await (await fetch("https://streamed.pk/api/sports")).json();
  const array= [];
  for (const category of categories){
    array.push(category.id);
  }
  return array;
}
async function getmatchespercategory(category){
  const match = await(await fetch(`https://streamed.pk/api/matches/${category}`)).json();
  return match;
}
async function gettodaymatches(){
  const match = await (await fetch("https://streamed.pk/api/matches/all-today")).json();
  return match;
}
async function gettodayspopularmatches(){
  const match = await (await fetch("https://streamed.pk/api/matches/all-today/popular")).json();
  return match;
}
async function getmatchescategorypopular(category){
  const match = await(await fetch(`https://streamed.pk/api/matches/${category}/popular`)).json();
  return match;
}
async function getlivematches(){
  const match = await (await fetch ("https://streamed.pk/api/matches/live")).json();
  return match;
}
async function getlivepopularmatches(){
  const match = await(await fetch ("https://streamed.pk/api/matches/live/popular")).json();
  return match;
async function getembedurl(data) {
  const results = [];

  for (const match of data) {

    if (!match.sources?.length) {
      continue;
    }

    const matchData = {
      title: match.title,
      streams: []
    };

    for (const source of match.sources) {

      const streams = await (
        await fetch(
          `https://streamed.pk/api/stream/${source.source}/${source.id}`
        )
      ).json();

      for (const stream of streams) {
        matchData.streams.push({
          streamNo: stream.streamNo,
          viewers: stream.viewers,
          embedUrl: stream.embedUrl
        });
      }
    }

    results.push(matchData);
  }

  return results;
}
function loadStream(embedUrl) {
    document.getElementById('stream-player').src = embedUrl;
}

