import React from 'react'
import VideoCard from '../components/VideoCard'

const Home = () => {
  // Dummy data check karne ke liye
  const dummyVideos = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      {dummyVideos.map((video) => (
        <VideoCard key={video} />
      ))}
    </div>
  )
}

export default Home