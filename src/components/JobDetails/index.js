import {AiTwotoneStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {FaSuitcase} from 'react-icons/fa'

import './index.css'

const JobDetails = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    companyWebsiteUrl,
    title,
    location,
    packagePerAnnum,
    rating,
    skills,
    lifeAtCompany,
  } = data
  return (
    <div className="jobcard-container">
      <div className="jobcard-name-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="jobcard-image"
        />
        <div className="jobcard">
          <h1>{title}</h1>
          <div className="jobcard-rating">
            <AiTwotoneStar className="jobcard-icon" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="jobcard-item">
        <div className="jobcard-details">
          <TiLocation className="jobcard-icon" />
          <p>{location}</p>
        </div>
        <div className="jobcard-details">
          <FaSuitcase className="jobcard-icon" />
          <p>{employmentType}</p>
        </div>
        <p>{packagePerAnnum}</p>
      </div>
      <hr className="line" />
      <div>
        <div className="description">
          <h1 className="jobcard-head">Description</h1>
          <a href={companyWebsiteUrl} target="blank">
            Visit
          </a>
        </div>
        <p className="life-para">{jobDescription}</p>
      </div>
      <h1>Skills</h1>
      <ul className="skills-container">
        {skills.map(each => (
          <li className="skills" key={each.name}>
            <img
              src={each.image_url}
              alt={each.name}
              className="skills-image"
            />
            <p>{each.name}</p>
          </li>
        ))}
      </ul>
      <h1>Life at Company</h1>
      <div className="life">
        <p className="life-para">{lifeAtCompany.description}</p>
        <img
          className="life-image"
          src={lifeAtCompany.image_url}
          alt="life at company"
        />
      </div>
    </div>
  )
}

export default JobDetails
