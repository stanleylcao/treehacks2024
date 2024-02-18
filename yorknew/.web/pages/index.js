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



export function Button_a2ceb7a45a8de52ca471587f1036e1f0 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_c0eef70eac6bf4641d0cfff4e9c1a276 = useCallback((_e) => addEvents([Event("state.state.go_up_rating", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_c0eef70eac6bf4641d0cfff4e9c1a276}>
  <ChevronRightIcon/>
</RadixThemesButton>
  )
}

export function Select__root_ba1fdc344fb8e395092665fdaeb84754 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_change_d2bc137978ba128f0c6a0cee8d569a33 = useCallback((_e0) => addEvents([Event("state.state.go_specific_rating", {select_val:_e0})], (_e0), {}), [addEvents, Event])

  return (
    <RadixThemesSelect.Root css={{"fontFamily": "IBM Plex Mono", "fontSize": "1.5em"}} onValueChange={on_change_d2bc137978ba128f0c6a0cee8d569a33} size={`2`}>
  <RadixThemesSelect.Trigger placeholder={`Current Page #`}/>
  <RadixThemesSelect.Content>
  <Select__group_8817d5fb4d179b08dadc6cc943614b79/>
</RadixThemesSelect.Content>
</RadixThemesSelect.Root>
  )
}

export function Button_45f964a4d63b81137696a9bd044e979c () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_b049d40b7b026dd22493041e2283d642 = useCallback((_e) => addEvents([Event("state.state.go_random_rating", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_b049d40b7b026dd22493041e2283d642}>
  <StarIcon/>
</RadixThemesButton>
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

export function Select__group_8817d5fb4d179b08dadc6cc943614b79 () {
  const state__state = useContext(StateContexts.state__state)


  return (
    <RadixThemesSelect.Group>
  <RadixThemesSelect.Label>
  {`Page Number`}
</RadixThemesSelect.Label>
  {state__state.imgidlist.map((item, index_efe375a01b46a1f2c495265a3b440b7a) => (
  <RadixThemesSelect.Item key={index_efe375a01b46a1f2c495265a3b440b7a} value={item}>
  {item}
</RadixThemesSelect.Item>
))}
</RadixThemesSelect.Group>
  )
}

export function Root_2c087f4a4516a65cc84a48a839058d45 () {
  
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
  <RadixThemesText as={`p`} css={{"fontFamily": "Merriweather"}} size={`3`}>
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

export function Heading_56f074d50f245420c7f920792e5141d4 () {
  const state__state = useContext(StateContexts.state__state)


  return (
    <RadixThemesHeading css={{"fontFamily": "Merriweather"}} size={`7`}>
  {`Rate The Caption for Contest #                ${state__state.imgidlist.at(state__state.contest_number_rating)}`}
</RadixThemesHeading>
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

export function Button_d2e0d5496b765d5b4ec313442fa44fb8 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_1299ddb2cbe4891341421fba0659593a = useCallback((_e) => addEvents([Event("state.state.go_down_rating", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_1299ddb2cbe4891341421fba0659593a}>
  <ChevronLeftIcon/>
</RadixThemesButton>
  )
}

export function Button_1c2317b99ce005c48a9068773d669e3c () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_266ad2b50b31e24f79ca702a3fe3dc46 = useCallback((_e) => addEvents([Event("state.state.go_bottom_rating", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_266ad2b50b31e24f79ca702a3fe3dc46}>
  <ArrowLeftIcon/>
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

export function Fragment_5c5c246ce85f87a237219bd326197f41 () {
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
  <RadixThemesText as={`p`} css={{"fontFamily": "Merriweather"}}>
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

export function Img_595ad7a23a1cbab3c92fafc0df126efa () {
  const state__state = useContext(StateContexts.state__state)


  return (
    <img css={{"height": "200px"}} src={`/contest_images/${state__state.imgidlist.at(((state__state.contest_number_rating) - (1)))}.jpg`}/>
  )
}

export function Button_a65bf15d53266ff7a89bf80861934da1 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_cc6a26e99ce850d470e68753713179ef = useCallback((_e) => addEvents([Event("state.state.go_top_rating", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton css={{"fontFamily": "Merriweather", "transition": "background-color 0.3s ease, transform 0.3s ease", "background-color": "#2E2D29", "&:hover": {"transform": "scale(1.1)", "background-color": "#8C1515"}}} onClick={on_click_cc6a26e99ce850d470e68753713179ef}>
  <ArrowRightIcon/>
</RadixThemesButton>
  )
}

export default function Component() {

  return (
    <Fragment>
  <Fragment_5c5c246ce85f87a237219bd326197f41/>
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
  <Heading_56f074d50f245420c7f920792e5141d4/>
  <Img_595ad7a23a1cbab3c92fafc0df126efa/>
  <RadixThemesFlex align={`start`} css={{"flexDirection": "row"}} gap={`2`}>
  <Button_1c2317b99ce005c48a9068773d669e3c/>
  <Button_d2e0d5496b765d5b4ec313442fa44fb8/>
  <Button_45f964a4d63b81137696a9bd044e979c/>
  <Button_a2ceb7a45a8de52ca471587f1036e1f0/>
  <Button_a65bf15d53266ff7a89bf80861934da1/>
  <Select__root_ba1fdc344fb8e395092665fdaeb84754/>
</RadixThemesFlex>
  <RadixThemesFlex align={`start`} css={{"flexDirection": "row"}} gap={`2`}>
  <Button_970a8db67d547b22fb0302bd7d87d3a8/>
  <Button_4aaac9418eba85da1aeaa1045d354a2b/>
</RadixThemesFlex>
  <Root_2c087f4a4516a65cc84a48a839058d45/>
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
