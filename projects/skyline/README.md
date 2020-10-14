# The Skyline chart

This library provides a rising skyline chart, i.e. a skyline widget, which is linked to a dynamic history of buildings.
This chart has been created for the project Fitzhì. And the aim of this component 



![Build_and_test](https://github.com/frvidal/workspace-skyline/workflows/Build_and_test/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.14.

![Rising Skyine](https://frvidal.github.io/workspace-skyline/projects/skyline/img/rising-skyline.gif)


## Installing this library in your project ?

The most simple command `npm install rising-skyline` will install this library

To import the module inside your application, just add the module **RisingSkylineModule** in your `app.module.ts`.

location :
> import {RisingSkyline} from 'rising_skyline';



## Using this library in your application ?

To include this component into a container, you just have to declare this section into your HTML template.

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
**height** | INPUT | The height of the container hosting the skyline
**width** | INPUT | The width of the container hosting the skyline
**skyline$** | INPUT | An observable which emits an array of episodes in the rising. Each episode ties on a week in a year and contains an array of buildings, which are described below.
**speed** | INPUT | The speed of the animation in ms. 
**startingColor** | INPUT | The starting color in the index-range. (Each building has a property named **index**). This index determines the color.    
**endingColor** | INPUT | The ending color in the index-range. (Each building has a property named **index**). This index determines the color.    


## What is a building ?

In this component, the skyline is an array of buildings.

A building is a piece of the skyline. 

Property | type | Comment
------------ | ------------- | -------------
**id** | number | the identifier
**width** | number | the width of the building
**height** | number | the height of the building
**year** | number | the year of the building corresponding to this state of building 
**week** | number | the week of the building corresponding to this state of building
**index** | number | the index in the building in the range of colors
**title** | string | the title of the building
