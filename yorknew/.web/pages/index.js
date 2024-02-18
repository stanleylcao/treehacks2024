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



export function Button_4aaac9418eba85da1aeaa1045d354a2b () {
  const state__state = useContext(StateContexts.state__state)
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_c682aa20f98c7a419c9418731a87dcb7 = useCallback((_e) => addEvents([Event("state.btn_state.button_2_click", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_c682aa20f98c7a419c9418731a87dcb7} size={`4`} type={`submit`}>
  {state__state.caption_2?.caption}
</RadixThemesButton>
  )
}

export function Button_003ece20943c7c25893300f39b52bff2 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_e85e23e7a228cd11bc28ca3620500667 = useCallback((_e) => addEvents([Event("state.rating_scroller.go_random", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_e85e23e7a228cd11bc28ca3620500667}>
  <StarIcon/>
</RadixThemesButton>
  )
}

export function Button_b534446ba277c27f3363bac74943e211 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_299b7fcf30a353582788d7c3ae80b603 = useCallback((_e) => addEvents([Event("state.rating_scroller.go_up", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_299b7fcf30a353582788d7c3ae80b603}>
  <ChevronRightIcon/>
</RadixThemesButton>
  )
}

export function Button_320eee58b180a7b9a540d71f77529c7f () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_2939200eea777f8472dc8e0dfda72a2d = useCallback((_e) => addEvents([Event("_redirect", {path:`/about`,external:false})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_2939200eea777f8472dc8e0dfda72a2d}>
  <QuestionIcon/>
  {`About`}
</RadixThemesButton>
  )
}

export function Button_dbf365d4c19d67f0eff03f1d79ca9835 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_f8ff9673d89bdaf96fc01edf8008cf4d = useCallback((_e) => addEvents([Event("state.rating_scroller.go_bottom", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_f8ff9673d89bdaf96fc01edf8008cf4d}>
  <ArrowLeftIcon/>
</RadixThemesButton>
  )
}

export function Heading_86b9067eaa950f5ab8b4f46c14de9c75 () {
  const state__state = useContext(StateContexts.state__state)


  return (
    <RadixThemesHeading css={{"fontFamily": "Merriweather", "fontSize": "35px"}} size={`7`}>
  {`Rate The Caption for Image                         ${state__state.contest_number_rating}`}
</RadixThemesHeading>
  )
}

export function Root_098c5cd6eb9588158725d0df85312f98 () {
  
    const handleSubmit_af2c23b8e0f779a09089ef3004458a2b = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.state.handle_submit", {form_data:form_data})])

        if (true) {
            $form.reset()
        }
    })
    
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <RadixFormRoot className={`Root`} onSubmit={handleSubmit_af2c23b8e0f779a09089ef3004458a2b}>
  <RadixThemesFlex align={`center`} css={{"flexDirection": "column"}} gap={`2`}>
  <RadixThemesText as={`p`} css={{"fontFamily": "Merriweather", "fontSize": "17px"}} size={`3`}>
  {`Don't like either? Write your own!`}
</RadixThemesText>
  <RadixThemesTextField.Input css={{"width": "200px", "height": "50px"}} name={`new_name`} placeholder={`My leaderboard name...`}/>
  <RadixThemesTextField.Input css={{"width": "300px", "height": "50px"}} name={`new_caption`} placeholder={`My superior caption...`}/>
  <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} size={`4`} type={`submit`}>
  {`Submit my caption`}
</RadixThemesButton>
</RadixThemesFlex>
</RadixFormRoot>
  )
}

export function Fragment_cc2e4d6f5549d33d0c5adb12972ce3f0 () {
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
  <RadixThemesText as={`p`} css={{"fontFamily": "Merriweather", "fontSize": "17px"}}>
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

export function Button_ca51ef317f434ab361955e4f849b950c () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_73cbbcc5d9db9e563330a061e04f36ef = useCallback((_e) => addEvents([Event("_redirect", {path:`/`,external:false})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_73cbbcc5d9db9e563330a061e04f36ef}>
  <PlusSquareIcon/>
  {`Rating`}
</RadixThemesButton>
  )
}

export function Select__group_0e3d6be8d883443f70072cffd2683a63 () {
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

export function Button_cabe04bb24a000901150e8233850a7da () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_9145ee51f08d0dea0717cf5b624a566c = useCallback((_e) => addEvents([Event("_redirect", {path:`/rankings`,external:false})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_9145ee51f08d0dea0717cf5b624a566c}>
  <ViewIcon/>
  {`Leaderboard`}
</RadixThemesButton>
  )
}

export function Button_92d9dee07ea66a0a62e5678594f0692b () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_486d68bd6984ef8738212908daba66a4 = useCallback((_e) => addEvents([Event("state.rating_scroller.go_down", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_486d68bd6984ef8738212908daba66a4}>
  <ChevronLeftIcon/>
</RadixThemesButton>
  )
}

export function Button_6685b198987eb72d769deb403668cc6b () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_045e2368beb22637f5e6c9356a442f44 = useCallback((_e) => addEvents([Event("state.rating_scroller.go_top", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_045e2368beb22637f5e6c9356a442f44}>
  <ArrowRightIcon/>
</RadixThemesButton>
  )
}

export function Button_c0cc43193ad3f062751cb7f60534aec3 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_df336efed36fc00b2a9809f569ea80c9 = useCallback((_e) => addEvents([Event("state.state.clear_db", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_df336efed36fc00b2a9809f569ea80c9}>
  <ViewIcon/>
  {`CLEAR`}
</RadixThemesButton>
  )
}

export function Button_970a8db67d547b22fb0302bd7d87d3a8 () {
  const state__state = useContext(StateContexts.state__state)
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_209fb9d0d9cd73ef3110b3cdd79a0de0 = useCallback((_e) => addEvents([Event("state.btn_state.button_1_click", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_209fb9d0d9cd73ef3110b3cdd79a0de0} size={`4`} type={`submit`}>
  {state__state.caption_1?.caption}
</RadixThemesButton>
  )
}

export function Select__root_0f78b66b03b8b4b0a132e3f18d3ee904 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_change_7ff3f25b3fd439863e98116207fa484b = useCallback((_e0) => addEvents([Event("state.rating_scroller.go_specific", {new_value:_e0})], (_e0), {}), [addEvents, Event])

  return (
    <RadixThemesSelect.Root css={{"fontFamily": "IBM Plex Mono", "fontSize": "1.5em"}} onValueChange={on_change_7ff3f25b3fd439863e98116207fa484b} size={`2`}>
  <RadixThemesSelect.Trigger placeholder={`Current Page #`}/>
  <RadixThemesSelect.Content>
  <Select__group_0e3d6be8d883443f70072cffd2683a63/>
</RadixThemesSelect.Content>
</RadixThemesSelect.Root>
  )
}

export default function Component() {

  return (
    <Fragment>
  <Fragment_cc2e4d6f5549d33d0c5adb12972ce3f0/>
  <Fragment>
  <RadixThemesFlex align={`start`} css={{"position": "fixed", "top": "0px", "borderBottom": "1px solid rgb(229, 229, 229)", "backgroundColor": "white", "padding": "1em", "height": "5em", "width": "100%", "zIndex": "5", "flexDirection": "row"}} gap={`2`}>
  <img css={{"width": "3em"}} src={`/eustace-400.webp`}/>
  <Button_c0cc43193ad3f062751cb7f60534aec3/>
  <RadixThemesFlex css={{"flex": 1, "justifySelf": "stretch", "alignSelf": "stretch"}}/>
  <RadixThemesHeading css={{"fontFamily": "NYTitleFont", "fontSize": "45px", "position": "absolute", "left": "0%", "right": "0%", "textAlign": "center", "zIndex": "-1"}}>
  {`THE NEW YORKER CAPTION CLUB`}
</RadixThemesHeading>
  <Button_320eee58b180a7b9a540d71f77529c7f/>
  <Button_ca51ef317f434ab361955e4f849b950c/>
  <Button_cabe04bb24a000901150e8233850a7da/>
</RadixThemesFlex>
  <RadixThemesContainer css={{"paddingTop": "6em"}}>
  <RadixThemesFlex css={{"height": "100vh", "display": "flex", "alignItems": "center", "justifyContent": "center"}}>
  <RadixThemesFlex align={`center`} css={{"fontSize": "2em", "flexDirection": "column"}} gap={`7`}>
  <Heading_86b9067eaa950f5ab8b4f46c14de9c75/>
  <img css={{"width": "400px"}} src={`/contest_images/729.jpg`}/>
  <RadixThemesFlex align={`start`} css={{"flexDirection": "row"}} gap={`2`}>
  <Button_dbf365d4c19d67f0eff03f1d79ca9835/>
  <Button_92d9dee07ea66a0a62e5678594f0692b/>
  <Button_003ece20943c7c25893300f39b52bff2/>
  <Button_b534446ba277c27f3363bac74943e211/>
  <Button_6685b198987eb72d769deb403668cc6b/>
  <Select__root_0f78b66b03b8b4b0a132e3f18d3ee904/>
</RadixThemesFlex>
  <RadixThemesFlex align={`start`} css={{"flexDirection": "row"}} gap={`2`}>
  <Button_970a8db67d547b22fb0302bd7d87d3a8/>
  <Button_4aaac9418eba85da1aeaa1045d354a2b/>
</RadixThemesFlex>
  <Root_098c5cd6eb9588158725d0df85312f98/>
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
