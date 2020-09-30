import React, { useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import axios from 'axios'

import { Transition } from '../../components'
import { loadGame, displayCreateGame, displayGameSelect, displayGameCard } from '../../redux/actions'
import { capitalizeString } from '../../helpers'
import { Game, AppState } from '../../types'

type FormValues = {
  name: string
  buyIn: string
}

export const CreateGame = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const showCreateGame = useSelector((state: AppState) => state.pokerBoard.showCreateGame)

  const handleSubmit = async ({ name, buyIn }: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    setLoading(true)
    const res = await axios.post(`https://poker-board.herokuapp.com/api/v1/game`, {
      name: name ? capitalizeString(name) : `Poker ${new Date().getDate()}.${new Date().getMonth()}`,
      buyIn: buyIn ? parseInt(buyIn) : 40,
    })
    dispatch(displayCreateGame(false))
    setTimeout(() => {
      batch(()=>{
        dispatch(loadGame(res.data as Game))
        dispatch(displayGameSelect(true))
        if (res.data) dispatch(displayGameCard(true))
      })
    }, 150)
  }

  return (
    <div className="mt-2 px-4">
      <Transition showCondition={showCreateGame}>
        <div className="my-6 mx-4 bg-gray-300 rounded shadow">
          <div className="pt-2 pl-8 font-bold text-xl text-gray-700 shadow">New game</div>
          <Formik initialValues={{ name: '', buyIn: '' }} onSubmit={handleSubmit}>
            {(props: FormikProps<FormValues>) => (
              <Form className="px-4 border-2">
                <div className="flex my-2 px-4 items-center">
                  <div className="mr-10 pb-1 font-mono font-medium text-gray-600 ">Name</div>
                  <Field
                    className="w-40 py-1 px-2 font-mono font-medium text-gray-800 border border-gray-200 border-opacity-25 rounded bg-gray-200 outline-none"
                    name="name"
                    placeholder="Poker 12.11"
                  />
                </div>
                <div className="flex px-4 items-center">
                  <div className="mr-5 pb-1 font-mono font-medium text-gray-600 ">Buy-in</div>
                  <Field
                    className="w-40 py-1 px-2 font-mono font-medium text-gray-800 border border-gray-200 border-opacity-25 rounded bg-gray-200 outline-none"
                    name="buyIn"
                    placeholder="40"
                  />
                </div>
                <div className=" my-2 mx-4">
                  <button
                    className="w-20 p-2 flex justify-center border-2 border-white rounded-lg bg-gray-800 text-white font-mono font-semibold outline-none"
                    type="submit"
                    disabled={loading}
                  >
                    {!loading ? 'Submit' : <Loader type="Bars" color="#fff" height={25} width={25} />}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Transition>
    </div>
  )
}