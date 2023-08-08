import {TiLocation} from 'react-icons/ti'
import {FaSuitcase} from 'react-icons/fa'
import {AiTwotoneStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    title,
    rating,
    id,
  } = jobData
  const path = `/jobs/${id}`
  return (
    <Link to={path} className="nav-link">
      <div className="jobcard-container">
        <div className="jobcard-name-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <h1>{packagePerAnnum}</h1>
        </div>
        <hr className="line" />
        <div>
          <h1 className="jobcard-head">Description</h1>
          <p>{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
