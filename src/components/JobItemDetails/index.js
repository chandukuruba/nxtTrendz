import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobDetails from '../JobDetails'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  returnJobDetails = item => ({
    companyLogoUrl: item.company_logo_url,
    companyWebsiteUrl: item.company_website_url,
    employmentType: item.employment_type,
    jobDescription: item.job_description,
    id: item.id,
    skills: item.skills,
    lifeAtCompany: item.life_at_company,
    packagePerAnnum: item.package_per_annum,
    title: item.title,
    location: item.location,
    rating: item.rating,
  })

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetails = this.returnJobDetails(data.job_details)
      const similarJobs = data.similar_jobs.map(each =>
        this.returnJobDetails(each),
      )
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails,
        similarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoading = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for{' '}
      </p>
      <button
        className="logout-desktop-btn"
        type="button"
        onClick={this.getData}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          <JobDetails data={jobDetails} />
          <h1>Similar Jobs</h1>
          <ul className="similar-list-container">
            {similarJobs.map(each => (
              <SimilarJobs data={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        console.log('success')
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        console.log('failure')
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        console.log('loading')
        return this.renderLoading()
      default:
        console.log('default')
        return null
    }
  }
}

export default JobItemDetails
