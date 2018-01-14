import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import SimpleBlog from '../components/SimpleBlog'

describe('<SimpleBlog />', () => {
    let blog

    before(() => {
        blog = {
            title: 'Testing with Enzyme',
            author: 'Kenny Heinonen',
            likes: 5
        }
    })

    it('renders title', () => {

        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const titleDiv = blogComponent.find('.info')

        expect(titleDiv.text()).to.include(blog.title)
    })

    it('renders author', () => {

        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const authorDiv = blogComponent.find('.info')

        expect(authorDiv.text()).to.include(blog.author)
    })

    it('renders likes', () => {

        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const likesDiv = blogComponent.find('.likes')

        expect(likesDiv.text()).to.include(`blog has ${blog.likes} likes`)
    })

    it('clicking the button twice calls event handler twice', () => {

        const mockHandler = sinon.spy()

        const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
        
        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
    
        sinon.assert.callCount(mockHandler, 2)
    })
})