import React, { useRef, createRef, useEffect, useState } from "react"
import Img from "gatsby-image"
import arrowLeft from "../../images/arrow-left.svg"
import arrowRight from "../../images/arrow-right.svg"
import { useStaticQuery, graphql, Link } from "gatsby"
import { slugify } from "../../utils/utilities"

const Slider = () => {
  const url = typeof window !== "undefined" ? window.location.pathname : ""
  const slidePosts = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 4) {
        totalCount
        edges {
          node {
            id
            excerpt
            timeToRead

            frontmatter {
              title
              categories

              image {
                childImageSharp {
                  fluid(maxWidth: 700) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const [timeOut, setTimeOut] = useState(true)
  let slideIndex = 0
  let slidesRef = useRef([])
  let slides = slidesRef.current

  const showSlides = (n: any) => {
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"
    }
    slideIndex++
    if (slideIndex > slides.length) {
      slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "flex"
  }

  const nextSlide = () => {
    let next = slideIndex + 1
    if (next > slides.length - 1) {
      next = 0
    }
    slideIndex = next
    slides.forEach((slide: any, index: number) => {
      if (next === index) {
        slides[index].style.display = "flex"
      } else {
        slides[index].style.display = "none"
      }
    })
  }

  const prevSlide = () => {
    let prev = slideIndex - 1
    if (prev < 0) {
      prev = 3
    }
    slideIndex = prev
    slides.forEach((slide: any, index: number) => {
      if (prev === index) {
        slides[prev].style.display = "flex"
      } else {
        slides[index].style.display = "none"
      }
    })
  }
  useEffect(() => {
    showSlides(slideIndex)
  }, [])

  return (
    <>
      {slidePosts.allMarkdownRemark.edges.map(({ node }, index: number) => (
        <div
          className="slider-main fade"
          key={node.id}
          ref={el => (slidesRef.current[index] = el)}
        >
          <div>
            <Img
              className="slide-image"
              fluid={node.frontmatter.image.childImageSharp.fluid}
            />
          </div>
          <div className="text-info">
            <div className="arrows">
              <img src={arrowLeft} className="left-arrow" onClick={prevSlide} />
              <img
                src={arrowRight}
                className="right-arrow"
                onClick={nextSlide}
              />
            </div>
            <div className="category">
              <ul className="list-category">
                {node.frontmatter.categories.map((category: string) => (
                  <li key={slugify(category)}>
                    <Link to={`/category/${slugify(category)}`}>
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="article">
              <h1 className="font-cursive">
                <Link to={`/${node.fields.slug}`}>
                  {node.frontmatter.title}
                </Link>
              </h1>
              <p>{node.excerpt}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Slider
