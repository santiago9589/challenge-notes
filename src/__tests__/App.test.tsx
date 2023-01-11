import { screen, render, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import App from "../App"
import React from "react"

const modalTest = async () => {
    const createElement = screen.getByText(/create/i)
    let modalElement

    await waitFor(() => {
        fireEvent.click(createElement)
        modalElement = screen.getByTestId(/modal/i)
    })

    return { createElement, modalElement }
}


describe("", () => {

    beforeEach(() => {
        render(<BrowserRouter>
            <App />
        </BrowserRouter>)
    })

    it("Reenderiza correctamente", () => {

        const titleElement = screen.getByText(/my notes/i)
        const createElement = screen.getByText(/create/i)
        const archivedElement = screen.getByText(/archived/i)

        expect(titleElement).toBeInTheDocument()
        expect(createElement).toBeInTheDocument()
        expect(archivedElement).toBeInTheDocument()
    })

    it("Cuando clickeo create debe mostrar el formulario para crear", async () => {

        const createElement = screen.getByText(/create/i)
        let modalElement

        await waitFor(() => {
            fireEvent.click(createElement)
            modalElement = screen.getByTestId(/modal/i)

        })

        expect(modalElement).toBeInTheDocument()
    })

    it("Cuando clickeo cancel debe mostrar cerrar el modal", async () => {

        const createElement = screen.getByText(/create/i)
        let modalElement

        await waitFor(() => {
            fireEvent.click(createElement)
            modalElement = screen.getByTestId(/modal/i)
        })

        const cancelElement = screen.getByText(/cancel/i)

        await waitFor(() => {
            fireEvent.click(cancelElement)
        })

        expect(modalElement).toBeInTheDocument()
    })

    it("Cuando le doy save debe agregar la nota", async () => {

        const createElement = screen.getByText(/create/i)
        let modalElement

        await waitFor(() => {
            fireEvent.click(createElement)
            modalElement = screen.getByTestId(/modal/i)
        })

        const buttonAddElement = screen.getByRole("button", { name: /add/i })
        const inputTitleElement = screen.getByPlaceholderText(/new title/i)
        const textContextElement = screen.getByPlaceholderText(/new content/i)
        const inputCategoryElement = screen.getByPlaceholderText(/new category/i)
        const buttonSaveElement = screen.getByRole("button", { name: /save/i })

        await waitFor(() => {
            fireEvent.change(inputTitleElement, {
                target: {
                    value: "comprar agua"
                }
            })

            fireEvent.change(textContextElement, {
                target: {
                    value: "vender papa"
                }
            })

            fireEvent.change(inputCategoryElement, {
                target: {
                    value: "comer torta"
                }
            })

            fireEvent.click(buttonAddElement)
            fireEvent.click(buttonSaveElement)
        })

        await waitFor(() => {
            expect(screen.getAllByTestId(/card-/i).length).toBe(1)
        })
    })

})