import React from 'react'

const Follower = ({avatar_url: image, login: name, html_url: profile}) => {
  return <article className='card'>
      <img src={image} alt={name}></img>
      <h4>{name}</h4>
      <a href={profile}className='btn'>view profile</a>
    </article>
}

export default Follower
