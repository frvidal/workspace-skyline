# The Skyline chart

This library provides a rising skyline chart, i.e. a skyline widget, which is linked to a dynamic history of buildings.
This chart has been created for the project Fitzhì.



![Build_and_test](https://github.com/frvidal/workspace-skyline/workflows/Build_and_test/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installing this library in your project ?

The most simple command `npm install rising-skyline` will install this library

To import the module inside your application, just add the module **RisingSkylineModule** in your `app.module.ts`.

location :
> import {RisingSkyline} from 'rising_skyline';



## Using this library in your application ?

To include this component into a container, you just have to declare this section into the HTML template.

```
<rising-skyline
    [height] = 370
    [width] = 1200
    [skyline$] = skyline$
    [speed] = 30
    [startingColor] = "'#28a745'"
    [endingColor] = "'#8B0000'">
</rising-skyline>
```

The parameters are :

Parameter | Decorator | Comment
------------ | ------------- | -------------
height | INPUT | the height of the skyline container
width | INPUT | the width of the skyline container
skyline$ | INPUT | an observable which publishes an array of buildings to be drawn.
speed | INPUT | the speed of the animation
startingColor | INPUT | the starting color
endingColor | INPUT | the ending color


## What is a building ?

For this component, the skyline is an array of buildings.

A building is a piece of the skyline. 

Property | type | Comment
------------ | ------------- | -------------
id | number | the identifier of the slice, un unique number per pie
type | number | the type of slice
angle | number | the angle of this slice **in degree**
offset | number | the offset (in degrees) of this slice within the pie. This property is there for internal use. Its value will be processed by the component. 
color | string | the color of this slice
data | any | the data object associated to this child.
children | array of any | an array of data which can be considered as the children linked to this slice
activated | boolean | `true` or `false` if this slice is activated (the end-user has moved the mouse on it)
selected | boolean | `true` or `false` if this slice is selected (the end-user has clicked on it)


