const adhkar = [

    {
        title: "أذكار الصباح",
        icon: "🌅",
        description: "أذكار الصباح",

        items: [

            {
                text: "آية الكرسي.",
                count: 1
            },

            {
                text: "سورة الإخلاص.",
                count: 3
            },

            {
                text: "سورة الفلق.",
                count: 3
            },

            {
                text: "سورة الناس.",
                count: 3
            },

            {
                text: "الإكثار من ذكر الله والاستغفار.",
                count: "بدون عدد محدد"
            }

        ]
    },


    {
        title: "أذكار المساء",
        icon: "🌙",
        description: "أذكار المساء",

        items: [

            {
                text: "آية الكرسي.",
                count: 1
            },

            {
                text: "سورة الإخلاص.",
                count: 3
            },

            {
                text: "سورة الفلق.",
                count: 3
            },

            {
                text: "سورة الناس.",
                count: 3
            },

            {
                text: "الإكثار من ذكر الله والاستغفار.",
                count: "بدون عدد محدد"
            }

        ]
    },


    {
        title: "أذكار النوم",
        icon: "🛏️",
        description: "أذكار قبل النوم",

        items: [

            {
                text: "قراءة آية الكرسي.",
                count: 1
            },

            {
                text: "قراءة المعوذات.",
                count: 1
            },

            {
                text: "ذكر الله قبل النوم.",
                count: "حسب الذكر"
            }

        ]
    },


    {
        title: "أذكار بعد الصلاة",
        icon: "🕌",
        description: "أذكار بعد الصلاة",

        items: [

            {
                text: "الاستغفار.",
                count: 3
            },

            {
                text: "التسبيح.",
                count: 33
            },

            {
                text: "التحميد.",
                count: 33
            },

            {
                text: "التكبير.",
                count: 34
            }

        ]
    },


    {
        title: "أذكار الاستيقاظ",
        icon: "☀️",
        description: "أذكار عند الاستيقاظ",

        items: [

            {
                text: "حمد الله عند الاستيقاظ.",
                count: 1
            },

            {
                text: "ذكر الله.",
                count: "حسب الذكر"
            }

        ]
    },


    {
        title: "أذكار دخول المنزل",
        icon: "🏠",
        description: "ذكر الله عند دخول المنزل",

        items: [

            {
                text: "التسمية.",
                count: 1
            },

            {
                text: "السلام على أهل البيت.",
                count: 1
            }

        ]
    }

];


const grid =
    document.getElementById("adhkarGrid");

const reader =
    document.getElementById("dhikrReader");


function renderAdhkar() {

    grid.innerHTML =
        adhkar.map((item,index) => `

            <button
                class="feature-card adhkar-card"
                onclick="openDhikr(${index})">

                <div class="card-icon">
                    ${item.icon}
                </div>

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.description}
                </p>

                <b>
                    افتح الأذكار ←
                </b>

            </button>

        `).join("");
}


function openDhikr(index) {

    const item =
        adhkar[index];

    reader.innerHTML = `

        <div class="reader-title">

            <div class="reader-title-icon">
                ${item.icon}
            </div>

            <div>

                <small>
                    ذكر الله
                </small>

                <h2>
                    ${item.title}
                </h2>

            </div>

        </div>


        <div class="dhikr-list">

            ${item.items.map(
                (dhikr,i) => `

                    <div class="dhikr-item">

                        <div class="dhikr-number">
                            ${i + 1}
                        </div>

                        <div>

                            <div class="dhikr-text">
                                ${dhikr.text}
                            </div>

                            <span class="dhikr-count">
                                عدد المرات:
                                ${dhikr.count}
                            </span>

                        </div>

                    </div>

                `
            ).join("")}

        </div>
    `;

    reader.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


renderAdhkar();


/* قائمة الموبايل */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

if (menuBtn) {

    menuBtn.onclick = () => {
        navLinks.classList.toggle("show");
    };

}