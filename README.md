Run the following to start the project in development mode:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**Assumptions:**

1. I picked the 'most wrong' and 'most correct' color from the design and I interpolated those colors to find colors between them in order to have an interval to choose from when changing the colors. Interpolation happens on a curbed path that goes through the middle of the color wheel. A more appropiate interpolation would have been one that goes through the curbed path on the color wheel edge for more live colors and to avoid gray hues. I couldn't find a solution for this.

2. I chose not to use any state management library, but in retrospect this was a mistake. I assumed the logic of the application wouldn't be so extensive and a state management library (such as redux) would have helped. I realized this too late and I decided not to refactor the application in order to add it, given the size of it. An extension of it would require a state management library though.

3. My implementation is not perfect and I think I could have done it in a simpler way (maybe by leveraging a checkbox implementation, but I'm not sure if I could achieve the switch animation like that), but I started on this path and I was determined to go through with it as is.

4. I have worked with figma before, but this time I couldn't extract the shadow effect on focus. I couldn't find it.

5. The solution is fully extendable, both in the number of answer pairs as well as answer number within each pair.

6. A wrong answer compared to another wrong answer within the same pair won't change the color. I assumed there aren't answers 'less wrong' than others.

7. There are a few small issues with resizing the window (e.g. once an answer pair wraps, it won't de-wrap after enlarging the window).

This has been a learning experience for me, I have learned things I didn't know before. Thanks for taking the time for reviewing this solution.