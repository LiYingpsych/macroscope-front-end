export default function makeSingle<S, T>(
    generator: (params: S) => Generator<Promise<T>, any, unknown>
) {
    /* 
        Allows for promises to be called multiple times and will return the value of only the most recent
        Example:
        
        ```js
            function* asyncFunctionGeneratorWrapper() {
                yield asyncFunction();
            };

            const singleAsyncFunction = makeSingle(asyncFunctionGeneratorWrapper)

            const result1 = singleAsyncFunction() 
            const result2 = singleAsyncFunction() 
        ```

        In this example result1 will be undefined if it fails to return before singleAsyncFunction is called again 
    */

    let globalNonce;
    return async function(params: S) {
        const localNonce = (globalNonce = {});

        const iter = generator(params);
        let resumeValue;
        for (;;) {
            const n = iter.next(resumeValue);
            if (n.done) {
                return resumeValue; // final return value of passed generator
            }

            // whatever the generator yielded, _now_ run await on it
            try {
                resumeValue = await n.value;
            } catch (error) {
                if (localNonce === globalNonce) throw error;
            }
            if (localNonce !== globalNonce) {
                return; // a new call was made
            }
            // next loop, we give resumeValue back to the generator
        }
    };
}
