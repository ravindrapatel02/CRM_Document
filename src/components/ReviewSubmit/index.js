import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

const ReviewSubmit = () => {
     
    <Modal show={true}  backdrop="static">
    <Modal.Header closeButton>
      <Modal.Title>Help us to improve</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>How do you rate the quality of the test?</Form.Label>
          <div className='d-flex'>
            <Form.Check
              // inline
              type={'radio'}
              name="testQuality"
              value={'Excellent'}
              label="Excellent"

            //   onChange={handleReviewChange}
              id={`inline-radio-3`}
            />
            <Form.Check
              // inline
              name="testQuality"
              className='mx-2'
              value={'Very good'}
              label="Very good"
            //   onChange={handleReviewChange}
              type={'radio'}
              id={`inline-radio-3`}
            />
            <Form.Check
              // inline
              name="testQuality"
              className='mx-2'
              value={'Fair'}
              label="Fair"
            //   onChange={handleReviewChange}
              type={'radio'}
              id={`inline-radio-3`}
            />
            <Form.Check
              // inline
              name="testQuality"
              className='mx-2'
              value={'Poor'}
              label="Poor"
              type={'radio'}
            //   onChange={handleReviewChange}
              id={`inline-radio-3`}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>How was the technical interface of attempting the test?</Form.Label>
          <div className='d-flex'>
            <Form.Check
              // inline
              name="technicalInterface"
              label="Excellent"
              value={'Excellent'}
              type={'radio'}
            //   onChange={handleReviewChange}
              id={`inline-radio-3`}
            />
            <Form.Check
              // inline
              name="technicalInterface"
              className='mx-2'
              value={'Very good'}
              label="Very good"
              type={'radio'}
            //   onChange={handleReviewChange}
              id={`inline-radio-3`}
            />
            <Form.Check
              // inline
              name="technicalInterface"
              className='mx-2'
              value={'Fair'}
              label="Fair"
              type={'radio'}
            //   onChange={handleReviewChange}
              id={`inline-radio-3`}
            />
            <Form.Check
              // inline
              name="technicalInterface"
              className='mx-2'
              value={'Poor'}
              label="Poor"
              type={'radio'}
            //   onChange={handleReviewChange}
              id={`inline-radio-3`}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>How did you attempt the test ?</Form.Label>
          <div className='d-flex'>
            <Form.Check
              // inline
              name="attemptedIn"
              label="Computer"
              value={'Computer'}
              type={'radio'}
            //   onChange={handleReviewChange}
              id={`inline-radio-3`}
            />
            <Form.Check
              // inline
              name="attemptedIn"
              className='mx-2'
              label="Mobile"
              value={'Mobile'}
              type={'radio'}
            //   onChange={handleReviewChange}

              id={`inline-radio-3`}
            />

          </div>
        </Form.Group>

      </Form>
    </Modal.Body>
    <Modal.Footer className='text-center'>
      <Button variant="primary" >
        Submit
      </Button>
    </Modal.Footer>
  </Modal>
  
}

export default ReviewSubmit