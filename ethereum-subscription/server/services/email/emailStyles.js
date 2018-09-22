const emailStyle = `
    <style type="text/css">
        .body {
            background-color: #eeeeee;
            padding: 40px 0;
            font-size: 18px;
        }
        .wrapper {
            max-width: 650px;
            margin: 0 auto;
        }
        .segment {
            box-shadow: rgba(34, 36, 38, 0.15) 0 1px 2px 0;
            background: rgb(255, 255, 255);
            margin: 1rem 0;
            padding: 1em;
            border-radius: 0.285714rem;
            border: 1px solid rgba(34, 36, 38, 0.15);
        }
        .fine-print {
            font-size: 14px;
        }
        hr {
            border-top: 1px solid rgba(34,36,38,.15);
            border-bottom: 1px solid rgba(255,255,255,.1);
        }
    </style>
`;

module.exports = {
    emailContentStart: (`
        <div>
            ${emailStyle}
            <div class="body">
                <div class="wrapper">
                    <div class="segment">
    `),
    emailContentEnd: (`
                    </div>
                </div>
            </div>
        </div>
    `)
};