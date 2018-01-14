import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Blog from '../components/Blog'

describe('<Blog />', () => {
    let blog

    before(() => {
        blog = {
            title: 'Testing with Enzyme',
            author: 'Kenny Heinonen',
            url: 'https://cs.helsinki.fi',
            likes: 5
        }
    })

    it('renders title and author', () => {

        const blogComponent = shallow(<Blog blog={blog} />)
        const headerDiv = blogComponent.find('.header')
        const detailsDiv = blogComponent.find('.details')

        expect(headerDiv.text()).to.include(blog.title)
        expect(headerDiv.text()).to.include(blog.author)
    })
})