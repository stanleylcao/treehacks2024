/** @jsxImportSource @emotion/react */


import { Fragment, useCallback, useContext } from "react"
import { EventLoopContext, StateContexts } from "/utils/context"
import { Event, getBackendURL, getRefValue, getRefValues, isTrue } from "/utils/state"
import { Button as RadixThemesButton, Container as RadixThemesContainer, Dialog as RadixThemesDialog, Flex as RadixThemesFlex, Heading as RadixThemesHeading, Select as RadixThemesSelect, Text as RadixThemesText, TextField as RadixThemesTextField, Theme as RadixThemesTheme } from "@radix-ui/themes"
import env from "/env.json"
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, PlusSquareIcon, QuestionIcon, StarIcon, ViewIcon } from "@chakra-ui/icons"
import "@radix-ui/themes/styles.css"
import theme from "/utils/theme.js"
import { Root as RadixFormRoot } from "@radix-ui/react-form"
import NextHead from "next/head"



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

export function Button_3aaf4f98d67924d267702d81d2f1cd7e () {
  const [addEvents, connectError] = useContext(EventLoopContext);
  const state__state = useContext(StateContexts.state__state)

  const on_click_209fb9d0d9cd73ef3110b3cdd79a0de0 = useCallback((_e) => addEvents([Event("state.btn_state.button_1_click", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_209fb9d0d9cd73ef3110b3cdd79a0de0} size={`4`} type={`submit`}>
  {state__state.test_caption_1?.caption}
</RadixThemesButton>
  )
}

export function Button_10920ad0cf9cb8f6776ffb99f45c3ac9 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_f8ff9673d89bdaf96fc01edf8008cf4d = useCallback((_e) => addEvents([Event("state.rating_scroller.go_bottom", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_f8ff9673d89bdaf96fc01edf8008cf4d}>
  <ArrowLeftIcon/>
</RadixThemesButton>
  )
}

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

export function Button_ac371ddd6278d40eb662bf58f172e0ea () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_e85e23e7a228cd11bc28ca3620500667 = useCallback((_e) => addEvents([Event("state.rating_scroller.go_random", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_e85e23e7a228cd11bc28ca3620500667}>
  <StarIcon/>
</RadixThemesButton>
  )
}

export function Select__group_6375fb5186608017a23de549cdfa3551 () {
  const state__rating_scroller = useContext(StateContexts.state__rating_scroller)


  return (
    <RadixThemesSelect.Group>
  <RadixThemesSelect.Label>
  {`Page Number`}
</RadixThemesSelect.Label>
  {state__rating_scroller.displist.map((item, index_efe375a01b46a1f2c495265a3b440b7a) => (
  <RadixThemesSelect.Item key={index_efe375a01b46a1f2c495265a3b440b7a} value={item}>
  {item}
</RadixThemesSelect.Item>
))}
</RadixThemesSelect.Group>
  )
}

export function Select__root_94ec74ba811674794308b19a552e1a83 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_change_7ff3f25b3fd439863e98116207fa484b = useCallback((_e0) => addEvents([Event("state.rating_scroller.go_specific", {new_value:_e0})], (_e0), {}), [addEvents, Event])

  return (
    <RadixThemesSelect.Root css={{"fontFamily": "IBM Plex Mono", "fontSize": "1.5em"}} onValueChange={on_change_7ff3f25b3fd439863e98116207fa484b} size={`2`}>
  <RadixThemesSelect.Trigger placeholder={`Current Page #`}/>
  <RadixThemesSelect.Content>
  <Select__group_6375fb5186608017a23de549cdfa3551/>
</RadixThemesSelect.Content>
</RadixThemesSelect.Root>
  )
}

export function Button_a90d457b485ff449f1365dbc582ded5d () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_486d68bd6984ef8738212908daba66a4 = useCallback((_e) => addEvents([Event("state.rating_scroller.go_down", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_486d68bd6984ef8738212908daba66a4}>
  <ChevronLeftIcon/>
</RadixThemesButton>
  )
}

export function Button_10abf6ba190f9025d0ae74b48ae2a762 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_045e2368beb22637f5e6c9356a442f44 = useCallback((_e) => addEvents([Event("state.rating_scroller.go_top", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_045e2368beb22637f5e6c9356a442f44}>
  <ArrowRightIcon/>
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

export function Button_124ba6f52e1e0e1ae680e0a5b282c7cc () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_299b7fcf30a353582788d7c3ae80b603 = useCallback((_e) => addEvents([Event("state.rating_scroller.go_up", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_299b7fcf30a353582788d7c3ae80b603}>
  <ChevronRightIcon/>
</RadixThemesButton>
  )
}

export function Button_5db4940ff9dda6799299a5227c7c06dd () {
  const [addEvents, connectError] = useContext(EventLoopContext);
  const state__state = useContext(StateContexts.state__state)

  const on_click_c682aa20f98c7a419c9418731a87dcb7 = useCallback((_e) => addEvents([Event("state.btn_state.button_2_click", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_c682aa20f98c7a419c9418731a87dcb7} size={`4`} type={`submit`}>
  {state__state.test_caption_2?.caption}
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

export default function Component() {

  return (
    <Fragment>
  <Fragment_1762bb90abdb81b879b2a22edbbe01a1/>
  <Fragment>
  <RadixThemesFlex align={`start`} css={{"position": "fixed", "top": "0px", "backgroundColor": "lightgray", "padding": "1em", "height": "4em", "width": "100%", "zIndex": "5", "flexDirection": "row"}} gap={`2`}>
  <img css={{"width": "2em"}} src={`/eustace-400.webp`}/>
  <RadixThemesFlex css={{"flex": 1, "justifySelf": "stretch", "alignSelf": "stretch"}}/>
  <RadixThemesHeading css={{"fontFamily": "NYTitleFont", "fontSize": "2em", "position": "absolute", "left": "0%", "right": "0%", "textAlign": "center"}}>
  {`YORKNEW`}
</RadixThemesHeading>
  <Button_73dccf635777e9b63a9d03f9c8e3a608/>
  <Button_e00a6c9cbb18ab1d43a894a35482fb5a/>
  <Button_8acf3db9f5cfd134e66cc91cc5619fe3/>
</RadixThemesFlex>
  <RadixThemesContainer css={{"paddingTop": "6em"}}>
  <RadixThemesFlex css={{"height": "100vh", "display": "flex", "alignItems": "center", "justifyContent": "center"}}>
  <RadixThemesFlex align={`center`} css={{"fontSize": "2em", "flexDirection": "column"}} gap={`7`}>
  <Heading_9cf1a1296a9061d170141f36d8d2c54b/>
  <img css={{"width": "400px"}} src={`/contest_images/729.jpg`}/>
  <RadixThemesFlex align={`start`} css={{"flexDirection": "row"}} gap={`2`}>
  <Button_10920ad0cf9cb8f6776ffb99f45c3ac9/>
  <Button_a90d457b485ff449f1365dbc582ded5d/>
  <Button_ac371ddd6278d40eb662bf58f172e0ea/>
  <Button_124ba6f52e1e0e1ae680e0a5b282c7cc/>
  <Button_10abf6ba190f9025d0ae74b48ae2a762/>
  <Select__root_94ec74ba811674794308b19a552e1a83/>
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
