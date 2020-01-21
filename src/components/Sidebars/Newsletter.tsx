import React from "react"

const Newsletter = () => {
  return (
    <div className="newsletter-card">
      <h2 className="text-center font-cursive">Sign Up for Our Newsletters</h2>
      <form>
        <div className="form-group">
          <input type="text" placeholder="First Name" />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" />
        </div>
        <div className="form-group">
          <button type="submit" className="text-center">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  )
}

export default Newsletter
