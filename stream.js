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
}

            

async function getembedurl(data) {
    const results = await Promise.all(

        data.map(async (match) => {

            if (!match.sources?.length) {
                return {
                    title: match.title,
                    streams: []
                };
            }

            const allStreams = await Promise.all(

                match.sources.map(source =>

                    fetch(
                        `https://streamed.pk/api/stream/${source.source}/${source.id}`
                    ).then(r => r.json())

                )

            );

            const streams = allStreams.flat();

            return {
                title: match.title,
                streams: streams.map(stream => ({
                    streamNo: stream.streamNo,
                    viewers: stream.viewers,
                    embedUrl: stream.embedUrl
                }))
            };

        })

    );

    return results;

}        




module.exports={
  getcategory,
  getembedurl,
  getlivematches,
  gettodaymatches,
  getlivepopularmatches,
  getmatchespercategory,
  gettodayspopularmatches,
  getmatchescategorypopular
  
}
