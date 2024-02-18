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



export function Button_c85cc02adcc10860e1d71a9e15e1c7d3 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_b049d40b7b026dd22493041e2283d642 = useCallback((_e) => addEvents([Event("state.state.go_random_rating", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_b049d40b7b026dd22493041e2283d642}>
  <StarIcon/>
</RadixThemesButton>
  )
}

export function Button_81e3836d02c85349ef2a73a7f3e58eb1 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_266ad2b50b31e24f79ca702a3fe3dc46 = useCallback((_e) => addEvents([Event("state.state.go_bottom_rating", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_266ad2b50b31e24f79ca702a3fe3dc46}>
  <ArrowLeftIcon/>
</RadixThemesButton>
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

export function Select__root_07c20c4405962205d910b9f56661b561 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_change_ae26367dac624a0b1a57ca0475a4da8f = useCallback((_e0) => addEvents([Event("state.state.go_specific_rating", {new_value:_e0})], (_e0), {}), [addEvents, Event])

  return (
    <RadixThemesSelect.Root css={{"fontFamily": "IBM Plex Mono", "fontSize": "1.5em"}} onValueChange={on_change_ae26367dac624a0b1a57ca0475a4da8f} size={`2`}>
  <RadixThemesSelect.Trigger placeholder={`Current Page #`}/>
  <RadixThemesSelect.Content>
  <Select__group_7f1502449cdf76b0da22ca1c90aca057/>
</RadixThemesSelect.Content>
</RadixThemesSelect.Root>
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

export function Button_e2d779293d7e7b2374d69d3e2186a44b () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_cc6a26e99ce850d470e68753713179ef = useCallback((_e) => addEvents([Event("state.state.go_top_rating", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_cc6a26e99ce850d470e68753713179ef}>
  <ArrowRightIcon/>
</RadixThemesButton>
  )
}

export function Select__group_7f1502449cdf76b0da22ca1c90aca057 () {
  const state__state = useContext(StateContexts.state__state)


  return (
    <RadixThemesSelect.Group>
  <RadixThemesSelect.Label>
  {`Page Number`}
</RadixThemesSelect.Label>
  {state__state.displist.map((item, index_efe375a01b46a1f2c495265a3b440b7a) => (
  <RadixThemesSelect.Item key={index_efe375a01b46a1f2c495265a3b440b7a} value={item}>
  {item}
</RadixThemesSelect.Item>
))}
</RadixThemesSelect.Group>
  )
}

export function Button_60c3aa81c4453aefc441016d0ae15ed4 () {
  const state__state = useContext(StateContexts.state__state)
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_c682aa20f98c7a419c9418731a87dcb7 = useCallback((_e) => addEvents([Event("state.btn_state.button_2_click", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_c682aa20f98c7a419c9418731a87dcb7} size={`4`} type={`submit`}>
  {state__state.caption_2?.caption}
</RadixThemesButton>
  )
}

export function Button_e28dfba5279e21fc6fdecec4351bc192 () {
  const state__state = useContext(StateContexts.state__state)
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_209fb9d0d9cd73ef3110b3cdd79a0de0 = useCallback((_e) => addEvents([Event("state.btn_state.button_1_click", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_209fb9d0d9cd73ef3110b3cdd79a0de0} size={`4`} type={`submit`}>
  {state__state.caption_1?.caption}
</RadixThemesButton>
  )
}

export function Button_b958bb37d20e4b3d349774161555716d () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_c0eef70eac6bf4641d0cfff4e9c1a276 = useCallback((_e) => addEvents([Event("state.state.go_up_rating", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_c0eef70eac6bf4641d0cfff4e9c1a276}>
  <ChevronRightIcon/>
</RadixThemesButton>
  )
}

export function Root_c49442acd5c012919c5118fbd8c99ebd () {
  const [addEvents, connectError] = useContext(EventLoopContext);
  
    const handleSubmit_af2c23b8e0f779a09089ef3004458a2b = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.state.handle_submit", {form_data:form_data})])

        if (true) {
            $form.reset()
        }
    })
    


  return (
    <RadixFormRoot className={`Root`} onSubmit={handleSubmit_af2c23b8e0f779a09089ef3004458a2b}>
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

export function Button_7a340bd940eaaa43ce56c96c3a82b748 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_1299ddb2cbe4891341421fba0659593a = useCallback((_e) => addEvents([Event("state.state.go_down_rating", {})], (_e), {}), [addEvents, Event])

  return (
    <RadixThemesButton onClick={on_click_1299ddb2cbe4891341421fba0659593a}>
  <ChevronLeftIcon/>
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

export function Img_6fe5e9e8f869df388381452bd0542946 () {
  const state__state = useContext(StateContexts.state__state)


  return (
    <img css={{"height": "400px"}} src={`/contest_images/${state__state.imagelist.at(((state__state.contest_number_rating) - (1)))}`}/>
  )
}

export function Heading_17d8f909d00aead216bdbd2ef89a9468 () {
  const state__state = useContext(StateContexts.state__state)


  return (
    <RadixThemesHeading size={`7`}>
  {`Rate The Caption for Image                 ${state__state.contest_number_rating}`}
</RadixThemesHeading>
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
  <Heading_17d8f909d00aead216bdbd2ef89a9468/>
  <Img_6fe5e9e8f869df388381452bd0542946/>
  <RadixThemesFlex align={`start`} css={{"flexDirection": "row"}} gap={`2`}>
  <Button_81e3836d02c85349ef2a73a7f3e58eb1/>
  <Button_7a340bd940eaaa43ce56c96c3a82b748/>
  <Button_c85cc02adcc10860e1d71a9e15e1c7d3/>
  <Button_b958bb37d20e4b3d349774161555716d/>
  <Button_e2d779293d7e7b2374d69d3e2186a44b/>
  <Select__root_07c20c4405962205d910b9f56661b561/>
</RadixThemesFlex>
  <RadixThemesFlex align={`start`} css={{"flexDirection": "row"}} gap={`2`}>
  <Button_e28dfba5279e21fc6fdecec4351bc192/>
  <Button_60c3aa81c4453aefc441016d0ae15ed4/>
</RadixThemesFlex>
  <Root_c49442acd5c012919c5118fbd8c99ebd/>
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
