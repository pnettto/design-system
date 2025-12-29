/* ==========================================================================
   CODE RUNNER - Execute code snippets
   ========================================================================== */

async function runCode(button) {
    const codeRunnerEl = button.closest(".code-runner");
    const outputEl = codeRunnerEl.querySelector(".code-output");
    const codeEl = codeRunnerEl.querySelector("code");

    const languageName = codeRunnerEl.dataset.languageName;
    const code = codeEl.textContent;
    const originalText = button.innerText;

    // Update UI State
    button.disabled = true;
    button.innerHTML = `<span class="code-spinner"></span>Running...`;
    outputEl.innerText = "";

    try {
        const response = await fetch(
            `https://demo-garden.pnetto.com/code-executor`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lang: languageName, code }),
            },
        );

        const result = await response.json();

        if (result.error) {
            outputEl.style.color = "#f44747";
            outputEl.innerText = `Execution error: ${result.error}`;
            outputEl.classList.add("is-loaded");
            return;
        }

        let output = "";
        outputEl.style.color = "";
        if (result.stdout) {
            output = result.stdout;
        } else if (result.stderr) {
            outputEl.style.color = "#e7bd18ff";
            output = result.stderr;
        } else {
            output = "Program executed with no output.";
        }

        outputEl.innerText = output;
        outputEl.classList.add("is-loaded");
    } catch (err) {
        outputEl.style.color = "#f44747";
        console.error(err);
        outputEl.innerText = `Execution error.`;
    } finally {
        button.disabled = false;
        button.innerText = originalText;
    }
}

window.runCode = runCode;
export { runCode };
