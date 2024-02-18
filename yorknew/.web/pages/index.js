/** @jsxImportSource @emotion/react */


import { Fragment, useCallback, useContext } from "react"
import { EventLoopContext, StateContexts } from "/utils/context"
import { Event, getBackendURL, getRefValue, getRefValues, isTrue } from "/utils/state"
import { Button as RadixThemesButton, Container as RadixThemesContainer, Dialog as RadixThemesDialog, Flex as RadixThemesFlex, Heading as RadixThemesHeading, Select as RadixThemesSelect, Text as RadixThemesText, TextField as RadixThemesTextField } from "@radix-ui/themes"
import env from "/env.json"
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, PlusSquareIcon, QuestionIcon, StarIcon, ViewIcon } from "@chakra-ui/icons"
import { Root as RadixFormRoot } from "@radix-ui/react-form"
import NextHead from "next/head"



export function Button_73dccf635777e9b63a9d03f9c8e3a608 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_2939200eea777f8472dc8e0dfda72a2d = useCallback((_e) => addEvents([Event("_redirect", {path:`/about`,external:false})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Libre Caslon Text"}} onClick={on_click_2939200eea777f8472dc8e0dfda72a2d}>
  <QuestionIcon/>
  {`About`}
</RadixThemesButton>
  )
}

export function Button_e00a6c9cbb18ab1d43a894a35482fb5a () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_73cbbcc5d9db9e563330a061e04f36ef = useCallback((_e) => addEvents([Event("_redirect", {path:`/`,external:false})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_73cbbcc5d9db9e563330a061e04f36ef}>
  <PlusSquareIcon/>
  {`Rating`}
</RadixThemesButton>
  )
}

export function Heading_9cf1a1296a9061d170141f36d8d2c54b () {
  const state__state = useContext(StateContexts.state__state)


  return (
    <RadixThemesHeading size={`7`}>
  {`Rate The Caption for Image                         ${state__state.contest_number_rating}`}
</RadixThemesHeading>
  )
}

export function Button_3f81869f991d07bcf7185cbf7da07242 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_df336efed36fc00b2a9809f569ea80c9 = useCallback((_e) => addEvents([Event("state.state.clear_db", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_df336efed36fc00b2a9809f569ea80c9}>
  <ViewIcon/>
  {`CLEAR`}
</RadixThemesButton>
  )
}

export function Button_3aaf4f98d67924d267702d81d2f1cd7e () {
  const state__state = useContext(StateContexts.state__state)
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_209fb9d0d9cd73ef3110b3cdd79a0de0 = useCallback((_e) => addEvents([Event("state.btn_state.button_1_click", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_209fb9d0d9cd73ef3110b3cdd79a0de0} size={`4`} type={`submit`}>
  {state__state.test_caption_1?.caption}
</RadixThemesButton>
  )
}

export function Button_5db4940ff9dda6799299a5227c7c06dd () {
  const state__state = useContext(StateContexts.state__state)
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_c682aa20f98c7a419c9418731a87dcb7 = useCallback((_e) => addEvents([Event("state.btn_state.button_2_click", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_c682aa20f98c7a419c9418731a87dcb7} size={`4`} type={`submit`}>
  {state__state.test_caption_2?.caption}
</RadixThemesButton>
  )
}

export function Root_c2fad76accffdb448c632d928d4973fc () {
  const [addEvents, connectError] = useContext(EventLoopContext);
  
    const handleSubmit_1594dd99e217e3483cad73ddb82b0448 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.state.handle_submit", {form_data:form_data})])

        if (true) {
            $form.reset()
        }
    })
    


  return (
    <RadixFormRoot className={`Root`} onSubmit={handleSubmit_1594dd99e217e3483cad73ddb82b0448}>
  <RadixThemesFlex align={`center`} css={{"flexDirection": "column"}} gap={`2`}>
  <RadixThemesText as={`p`} size={`3`}>
  {`Don't like either? Write your own!`}
</RadixThemesText>
  <RadixThemesTextField.Input css={{"width": "200px", "height": "50px"}} name={`new_name`} placeholder={`My leaderboard name...`}/>
  <RadixThemesTextField.Input css={{"width": "300px", "height": "50px"}} name={`new_caption`} placeholder={`My superior caption...`}/>
  <RadixThemesButton size={`4`} type={`submit`}>
  {`Submit my caption`}
</RadixThemesButton>
</RadixThemesFlex>
</RadixFormRoot>
  )
}

export function Button_8acf3db9f5cfd134e66cc91cc5619fe3 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_9145ee51f08d0dea0717cf5b624a566c = useCallback((_e) => addEvents([Event("_redirect", {path:`/rankings`,external:false})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_9145ee51f08d0dea0717cf5b624a566c}>
  <ViewIcon/>
  {`Leaderboard`}
</RadixThemesButton>
  )
}

export function Fragment_1762bb90abdb81b879b2a22edbbe01a1 () {
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <RadixThemesDialog.Root open={connectError !== null}>
  <RadixThemesDialog.Content>
  <RadixThemesDialog.Title>
  {`Connection Error`}
</RadixThemesDialog.Title>
  <RadixThemesText as={`p`}>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getBackendURL(env.EVENT).href}
</RadixThemesText>
</RadixThemesDialog.Content>
</RadixThemesDialog.Root>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  )
}

export default function Component() {

  return (
    <Fragment>
  <Fragment_1762bb90abdb81b879b2a22edbbe01a1/>
  <Fragment>
  <RadixThemesFlex align={`start`} css={{"position": "fixed", "top": "0px", "borderBottom": "1px solid rgb(229, 229, 229)", "backgroundColor": "white", "padding": "1em", "height": "4em", "width": "100%", "zIndex": "5", "flexDirection": "row"}} gap={`2`}>
  <img css={{"width": "2em"}} src={`/eustace-400.webp`}/>
  <RadixThemesFlex css={{"flex": 1, "justifySelf": "stretch", "alignSelf": "stretch"}}/>
  <RadixThemesHeading css={{"fontFamily": "NYTitleFont", "fontSize": "2em", "position": "absolute", "left": "0%", "right": "0%", "textAlign": "center", "zIndex": "-1"}}>
  {`YORKNEW`}
</RadixThemesHeading>
  <Button_73dccf635777e9b63a9d03f9c8e3a608/>
  <Button_e00a6c9cbb18ab1d43a894a35482fb5a/>
  <Button_8acf3db9f5cfd134e66cc91cc5619fe3/>
  <Button_3f81869f991d07bcf7185cbf7da07242/>
</RadixThemesFlex>
  <RadixThemesContainer css={{"paddingTop": "6em"}}>
  <RadixThemesFlex css={{"height": "100vh", "display": "flex", "alignItems": "center", "justifyContent": "center"}}>
  <RadixThemesFlex align={`center`} css={{"fontSize": "2em", "flexDirection": "column"}} gap={`7`}>
  <Heading_9cf1a1296a9061d170141f36d8d2c54b/>
  <img css={{"width": "400px"}} src={`/example_nycomic.webp`}/>
  <RadixThemesFlex align={`start`} css={{"flexDirection": "row"}} gap={`2`}>
  <RadixThemesButton>
  <ArrowLeftIcon/>
</RadixThemesButton>
  <RadixThemesButton>
  <ChevronLeftIcon/>
</RadixThemesButton>
  <RadixThemesButton>
  <StarIcon/>
</RadixThemesButton>
  <RadixThemesButton>
  <ChevronRightIcon/>
</RadixThemesButton>
  <RadixThemesButton>
  <ArrowRightIcon/>
</RadixThemesButton>
  <RadixThemesSelect.Root css={{"fontFamily": "IBM Plex Mono", "fontSize": "1.5em"}} size={`2`}>
  <RadixThemesSelect.Trigger placeholder={`Current Page #`}/>
  <RadixThemesSelect.Content>
  <RadixThemesSelect.Group>
  <RadixThemesSelect.Label>
  {`Page Number`}
</RadixThemesSelect.Label>
  <RadixThemesSelect.Item value={`1`}>
  {`1`}
</RadixThemesSelect.Item>
  <RadixThemesSelect.Item value={`2`}>
  {`2`}
</RadixThemesSelect.Item>
  <RadixThemesSelect.Item value={`3`}>
  {`3`}
</RadixThemesSelect.Item>
  <RadixThemesSelect.Item value={`4`}>
  {`4`}
</RadixThemesSelect.Item>
  <RadixThemesSelect.Item value={`5`}>
  {`5`}
</RadixThemesSelect.Item>
</RadixThemesSelect.Group>
</RadixThemesSelect.Content>
</RadixThemesSelect.Root>
</RadixThemesFlex>
  <RadixThemesFlex align={`start`} css={{"flexDirection": "row"}} gap={`2`}>
  <Button_3aaf4f98d67924d267702d81d2f1cd7e/>
  <Button_5db4940ff9dda6799299a5227c7c06dd/>
</RadixThemesFlex>
  <Root_c2fad76accffdb448c632d928d4973fc/>
</RadixThemesFlex>
</RadixThemesFlex>
</RadixThemesContainer>
</Fragment>
  <NextHead>
  <title>
  {`Yorknew`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
