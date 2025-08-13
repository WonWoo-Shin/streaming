const videosFilter = () => {
  const filterPromise = videos.map(async (video) => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=status&id=${video.key}&key=${YOUTUBE_API_KEY}`
    );
    const fetchData = await response.json();
    return fetchData;
  });

  const fetchResults = await Promise.all(filterPromise);

  const filteredVideos = videos.filter((_, index) => {
    return fetchResults[index].items.length !== 0;
  });

  return filteredVideos;
};
