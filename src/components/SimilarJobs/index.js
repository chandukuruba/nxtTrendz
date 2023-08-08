import {AiTwotoneStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const SimilarJobs = props => {
  const {data} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = data
  return (
    <li className="similar-list">
      <div className="jobcard-name-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div className="jobcard-item">
        <div className="jobcard-details">
          <TiLocation className="jobcard-icon" />
          <p>{location}</p>
        </div>
        <div className="jobcard-details">
          <FaSuitcase className="jobcard-icon" />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
