import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import './index.css'
import JobCard from '../JobCard'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentType: [],
    salary: '',
    userProfile: {},
    profileApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
    this.getProfile()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, employmentType, salary} = this.state
    const employment = employmentType.join()
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const {jobs} = await response.json()
      const updatedData = jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        packagePerAnnum: job.package_per_annum,
        location: job.location,
        title: job.title,
        rating: job.rating,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profile = {
        name: data.profile_details.name,
        profileImage: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userProfile: profile,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

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
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="logout-desktop-btn"
        onClick={this.getProducts}
      >
        Retry
      </button>
    </div>
  )

  renderProductsListView = () => {
    const {jobsList} = this.state
    const shouldShowProductsList = jobsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ul className="products-list">
          {jobsList.map(job => (
            <JobCard jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Jobs Found</h1>
        <p className="no-products-description">
          We could not find any jobs. Try other filters
        </p>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={this.getProducts}
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {userProfile, profileApiStatus} = this.state
    const {name, shortBio, profileImage} = userProfile
    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return (
          <div className="profile-container">
            <img className="profile-image" src={profileImage} alt="profile" />
            <h1 className="profile-head">{name}</h1>
            <p>{shortBio}</p>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div className="profile-container">
            <button
              className="logout-desktop-btn"
              type="button"
              onClick={this.getProfile}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  renderJobsList = () => (
    <>
      <div>{this.renderSearchInput()}</div>
      <div>{this.renderProductsListView()}</div>
    </>
  )

  onClickSearch = () => {
    this.setState({searchInput: ''}, this.getProducts)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          onClick={this.onClickSearch}
          type="button"
          className="search-button"
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onChangeCheckBox = event => {
    this.setState(prevState => {
      const {value} = event.target
      const {employmentType} = prevState
      let filteredList = employmentType
      if (employmentType.includes(value)) {
        filteredList = employmentType.filter(each => each !== value)
      } else {
        filteredList.push(value)
      }
      return {employmentType: filteredList}
    }, this.getProducts)
  }

  renderCheckBox = data => {
    const {label, employmentTypeId} = data
    return (
      <li>
        <input
          name="employment"
          type="checkbox"
          id={employmentTypeId}
          onChange={this.onChangeCheckBox}
          value={employmentTypeId}
          className="input"
          key={employmentTypeId}
        />
        <label htmlFor={employmentTypeId}>{label}</label>
      </li>
    )
  }

  onChangeRadio = event => {
    this.setState({salary: event.target.value}, this.getProducts)
  }

  renderRadio = data => {
    const {salaryRangeId, label} = data
    return (
      <li>
        <input
          type="radio"
          name="radio"
          value={salaryRangeId}
          id={salaryRangeId}
          onChange={this.onChangeRadio}
          className="input"
          key={salaryRangeId}
        />
        <label htmlFor={salaryRangeId}>{label}</label>
      </li>
    )
  }

  renderSuccessView = () => (
    <>
      <Header />
      <div className="jobs-container">
        <div className="jobs-profile-container">
          <div>{this.renderProfile()}</div>
          <hr className="line" />
          <h2>Type of Employment</h2>
          <ul className="checkbox">
            {employmentTypesList.map(each => this.renderCheckBox(each))}
          </ul>
          <hr className="line" />
          <h2>Salary Range</h2>
          <ul className="checkbox">
            {salaryRangesList.map(each => this.renderRadio(each))}
          </ul>
          <hr className="line" />
        </div>
        <div className="jobs-list-container">
          <div className="search-container">{this.renderSearchInput()}</div>
          <div>{this.renderProductsListView()}</div>
        </div>
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Jobs
