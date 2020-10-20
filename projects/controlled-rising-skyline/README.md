# The controlled rising Skyline chart

![Build_and_test](https://github.com/frvidal/workspace-skyline/workflows/CI%20controlled%20rising%20skyline/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This library provides a rising skyline chart with an horizotal panel control. This widget is linked to a dynamic history of buildings.

This chart has been created for the project [Fitzhì](http://www.fitzhi.com). 
In Fitzhì, the goal is to display the history of a rising applications portfolio, confronted to the turn-over risk on these applications.

On the top right corner of the skyline, two buttons, with one up and one down arrays, allow the end-user to zoom-in, or zoom-out the view. 

A panel control is associated with the skyline. With this panel, you will be able to :

* Pause, and restart the animation.
* Accelerate or decelate the animation
* Move the cursor, along the timeline.

This library requires these peer dependencies :

* @angular/material@^10.2.2
* @fortawesome/fontawesome-free@^5.15.1
* bootstrap@^4.5.2
* jquery@^3.5.1
* rising-skyline@^1.0.11

![Controlled rising Skyline](https://frvidal.github.io/workspace-skyline/projects/controlled-rising-skyline/img/controlled-rising-skyline.gif)


## Installing this library in your project ?

The most simple command `npm install controlled-rising-skyline@latest` will install this latest release

To import the module inside your application, just add the module **ControlledRisingSkylineModule** in your `app.module.ts`.

location :
> import {ControlledRisingSkyline} from 'controlled-rising-skyline';

Install (if necessary) the fonts and the bootstrap styles in your project
> @import '@fortawesome/fontawesome-free/css/all.css';
> @import "bootstrap/dist/css/bootstrap.css";

For testing purpose, the service `ControlledRisingSkylineService` provides a random generator for testing purpose. +
Its name is `randomSkylineHistory(skyline$: BehaviorSubject<Building[]>)` 

## Using this library in your application ?

To include this component into a container, you just have to declare this section into your HTML template.

```
<controlled-rising-skyline
    [height] = 370
    [width] = 1200
    [risingSkylineHistory$] = risingSkylineHistory$
    [speed] = 30
    [startingColor] = "'#28a745'"
    [endingColor] = "'#8B0000'"
    [sliderColor] = "'#0000FF'">
</controlled-rising-skyline>
```

The parameters are :

Parameter | Decorator | Comment
------------ | ------------- | -------------
**height** | INPUT | The height of the container hosting the skyline
**umHeight** | INPUT | _(Optional) The unit of measure for the height. It might be either 'px", or '%', or 'em'._ Default is **'px'**
**width** | INPUT | The width of the container hosting the skyline
**umWidth** | INPUT | _(Optional) The unit of measure for the width. It might be either 'px", or '%', or 'em'._ Default is **'px'**
**risingSkylineHistory$** | INPUT | An observable which emits an unordered array of episodes of the skyline rising. This list will be ordered by default **by id**. Each episode is associated to a week in a year and contains an array of buildings, of different heights. The **Building** object is described below.
**speed** | INPUT | The speed of the animation in ms.
**startingColor** | INPUT | The starting color in the index-range. (Each building has a property named **index**, and this index determines the color).
**endingColor** | INPUT | The ending color in the index-range. (Each building has a property named **index**, and this index determines the color).
**sliderColor** | INPUT | The color of the slider.

## What is a building ?

In this component, the skyline is an array of buildings.

So a building is a piece of the skyline. 

Property | type | Comment
------------ | ------------- | -------------
**id** | number | the identifier
**width** | number | the width of the building
**height** | number | the height of the building
**year** | number | the year of the building corresponding to this state of building 
**week** | number | the week of the building corresponding to this state of building
**index** | number | the index in the building in the range of colors
**title** | string | the title of the building
