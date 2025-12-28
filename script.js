// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tab navigation
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs and contents
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Show corresponding content
            const targetTab = this.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ACG Letters functionality
    const acgLetters = document.querySelectorAll('.acg-letter');
    const acgDetailsContainer = document.getElementById('acg-details-container');
    const acgPlaceholder = acgDetailsContainer ? acgDetailsContainer.querySelector('.acg-placeholder') : null;
    const acgDetails = {
        'a': document.getElementById('acg-details-a'),
        'c': document.getElementById('acg-details-c'),
        'g': document.getElementById('acg-details-g')
    };

    acgLetters.forEach(letter => {
        letter.addEventListener('click', function() {
            const letterId = this.getAttribute('data-letter');

            // Remove active class from all letters
            acgLetters.forEach(l => l.classList.remove('active'));

            // Add active class to clicked letter
            this.classList.add('active');

            // Hide placeholder and all details
            if (acgPlaceholder) {
                acgPlaceholder.style.display = 'none';
            }
            Object.values(acgDetails).forEach(detail => {
                if (detail) detail.style.display = 'none';
            });

            // Show selected letter details
            if (acgDetails[letterId]) {
                acgDetails[letterId].style.display = 'block';
            }
        });
    });

    // Stepper functionality
    const steps = document.querySelectorAll('.step');
    const stepDescription = document.getElementById('step-description');
    const stepDetails = {
        'upstream': document.getElementById('upstream-details'),
        'midstream': document.getElementById('midstream-details'),
        'downstream': document.getElementById('downstream-details')
    };

    steps.forEach(step => {
        step.addEventListener('click', function() {
            const stepId = this.getAttribute('data-step');

            // Remove active class from all steps
            steps.forEach(s => s.classList.remove('active'));

            // Add active class to clicked step
            this.classList.add('active');

            // Hide placeholder and all step details
            stepDescription.querySelector('.placeholder-text').style.display = 'none';
            Object.values(stepDetails).forEach(detail => {
                if (detail) detail.style.display = 'none';
            });

            // Show selected step details
            if (stepDetails[stepId]) {
                stepDetails[stepId].style.display = 'block';
            }
        });
    });

    // Turing Test functionality
    const turingTestIntro = document.getElementById('turing-test-intro');
    const turingTestContainer = document.getElementById('turing-test-container');
    const turingTestCompletion = document.getElementById('turing-test-completion');
    const startTestBtn = document.getElementById('start-test-btn');
    const guessBtn1 = document.getElementById('guess-btn-1');
    const guessBtn2 = document.getElementById('guess-btn-2');
    const testImage1 = document.getElementById('test-image-1');
    const testImage2 = document.getElementById('test-image-2');
    const testImageSource1 = document.getElementById('test-image-source-1');
    const testImageSource2 = document.getElementById('test-image-source-2');
    const testResultRow = document.getElementById('test-result-row');
    const testResult = document.getElementById('test-result');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const questionNumber = document.getElementById('question-number');
    const restartTestBtn = document.getElementById('restart-test-btn');
    const scoreNumber = document.getElementById('score-number');
    const scoreDisplay = document.getElementById('score-display');
    
    let currentQuestion = 1;
    let userScore = 0;
    const totalQuestions = 3;

    // Question data with images and sources
    const questionData = [
        {
            image1: {
                src: 'assets/Benefits/Question 1_image 1_human.jpg',
                answer: 'human',
                source: '<a href="https://x.com/LoveLive_staff/status/1813513985586831795" target="_blank">LoveLive! Days</a>'
            },
            image2: {
                src: 'assets/Benefits/Question 1_image 2_AI.png',
                answer: 'ai',
                source: 'Image generated by Gemini Nano Banana Pro'
            }
        },
        {
            image1: {
                src: 'assets/Benefits/Question 2_image 1_AI.png',
                answer: 'ai',
                source: 'Image generated by Gemini Nano Banana Pro'
            },
            image2: {
                src: 'assets/Benefits/Question 2_image 2_human.jpeg',
                answer: 'human',
                source: '<a href="https://x.com/LoveLive_staff/status/1513456833314246659/photo/2" target="_blank">LoveLive! Nijigasaki High School Idol Club</a>'
            }
        },
        {
            image1: {
                src: 'assets/Benefits/Question 3_image 1_human.jpeg',
                answer: 'human',
                source: '<a href="https://jp.pinterest.com/pin/599893612839380369/" target="_blank">Your Name</a>'
            },
            image2: {
                src: 'assets/Benefits/Question 3_image 2_AI.png',
                answer: 'ai',
                source: 'Image generated by Nano Banana Pro'
            }
        }
    ];

    // Function to load question images
    function loadQuestion(questionNum) {
        const question = questionData[questionNum - 1];
        if (!question) return;

        // Update Image 1
        if (testImage1) {
            testImage1.src = question.image1.src;
            testImage1.setAttribute('data-answer', question.image1.answer);
            testImage1.alt = `Question ${questionNum} - Image 1`;
        }
        if (testImageSource1) {
            testImageSource1.innerHTML = `<em>Source: ${question.image1.source}</em>`;
        }

        // Update Image 2
        if (testImage2) {
            testImage2.src = question.image2.src;
            testImage2.setAttribute('data-answer', question.image2.answer);
            testImage2.alt = `Question ${questionNum} - Image 2`;
        }
        if (testImageSource2) {
            testImageSource2.innerHTML = `<em>Source: ${question.image2.source}</em>`;
        }
    }

    // Function to reset question state
    function resetQuestion() {
        // Reset buttons and result
        if (guessBtn1 && guessBtn2) {
            guessBtn1.disabled = false;
            guessBtn2.disabled = false;
            guessBtn1.classList.remove('correct', 'incorrect');
            guessBtn2.classList.remove('correct', 'incorrect');
        }
        
        // Hide result row
        if (testResultRow) {
            testResultRow.style.display = 'none';
        }
        
        // Hide source text
        if (testImageSource1) {
            testImageSource1.style.display = 'none';
        }
        if (testImageSource2) {
            testImageSource2.style.display = 'none';
        }
        
        if (nextQuestionBtn) {
            nextQuestionBtn.style.display = 'none';
        }
    }

    // Function to show completion screen
    function showCompletionScreen() {
        // Hide test container, show completion screen
        turingTestContainer.style.display = 'none';
        turingTestCompletion.style.display = 'block';
        
        // Update score display
        if (scoreNumber) {
            scoreNumber.textContent = userScore;
        }
        if (scoreDisplay) {
            scoreDisplay.textContent = userScore;
        }
    }

    // Start Test button handler
    if (startTestBtn) {
        startTestBtn.addEventListener('click', function() {
            // Hide intro and completion, show test container
            turingTestIntro.style.display = 'none';
            turingTestCompletion.style.display = 'none';
            turingTestContainer.style.display = 'block';
            
            // Reset to first question and score
            currentQuestion = 1;
            userScore = 0;
            if (questionNumber) {
                questionNumber.textContent = currentQuestion;
            }
            
            // Load first question images
            loadQuestion(1);
            
            resetQuestion();
        });
    }

    // Restart Test button handler
    if (restartTestBtn) {
        restartTestBtn.addEventListener('click', function() {
            // Hide completion, show intro
            turingTestCompletion.style.display = 'none';
            turingTestIntro.style.display = 'block';
            turingTestContainer.style.display = 'none';
        });
    }

    // Next Question button handler
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function() {
            if (currentQuestion < totalQuestions) {
                // Move to next question
                currentQuestion++;
                
                // Update question number
                if (questionNumber) {
                    questionNumber.textContent = currentQuestion;
                }
                
                // Load new question images
                loadQuestion(currentQuestion);
                
                // Reset question state
                resetQuestion();
            } else {
                // All questions completed - show completion screen
                showCompletionScreen();
            }
        });
    }

    // Image 1 button handler
    if (guessBtn1) {
        guessBtn1.addEventListener('click', function() {
            const answer1 = testImage1.getAttribute('data-answer');
            const isCorrect = answer1 === 'human';
            
            // Update score if correct
            if (isCorrect) {
                userScore++;
            }
            
            // Disable both buttons
            guessBtn1.disabled = true;
            guessBtn2.disabled = true;
            
            // Add styling to selected button
            if (isCorrect) {
                guessBtn1.classList.add('correct');
                testResult.textContent = '✓ Correct! Image 1 is created by human.';
                    testResult.className = 'test-result success';
            } else {
                guessBtn1.classList.add('incorrect');
                testResult.textContent = '✗ Incorrect! Image 1 is not created by human.';
                testResult.className = 'test-result error';
            }
            
            // Show source text for both images
            if (testImageSource1) {
                testImageSource1.style.display = 'block';
            }
            if (testImageSource2) {
                testImageSource2.style.display = 'block';
            }
            
            // Show result row and next question button
            testResultRow.style.display = 'block';
            if (nextQuestionBtn) {
                if (currentQuestion < totalQuestions) {
                    nextQuestionBtn.textContent = 'Next Question';
                    nextQuestionBtn.style.display = 'block';
                } else {
                    nextQuestionBtn.textContent = 'Finish Test';
                    nextQuestionBtn.style.display = 'block';
                }
            }
        });
    }

    // Image 2 button handler
    if (guessBtn2) {
        guessBtn2.addEventListener('click', function() {
            const answer2 = testImage2.getAttribute('data-answer');
            const isCorrect = answer2 === 'human';
            
            // Update score if correct
            if (isCorrect) {
                userScore++;
            }
            
            // Disable both buttons
            guessBtn1.disabled = true;
            guessBtn2.disabled = true;
            
            // Add styling to selected button
            if (isCorrect) {
                guessBtn2.classList.add('correct');
                testResult.textContent = '✓ Correct! Image 2 is created by human.';
                testResult.className = 'test-result success';
            } else {
                guessBtn2.classList.add('incorrect');
                testResult.textContent = '✗ Incorrect! Image 2 is not created by human.';
                testResult.className = 'test-result error';
            }
            
            // Show source text for both images
            if (testImageSource1) {
                testImageSource1.style.display = 'block';
            }
            if (testImageSource2) {
                testImageSource2.style.display = 'block';
            }
            
            // Show result row and next question button
            testResultRow.style.display = 'block';
            if (nextQuestionBtn) {
                if (currentQuestion < totalQuestions) {
                    nextQuestionBtn.textContent = 'Next Question';
                    nextQuestionBtn.style.display = 'block';
                } else {
                    nextQuestionBtn.textContent = 'Finish Test';
                    nextQuestionBtn.style.display = 'block';
                }
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Split-Screen Slider functionality
    const backgroundSlider = document.getElementById('background-slider');
    const backgroundSliderHandle = document.getElementById('background-slider-handle');
    
    if (backgroundSlider && backgroundSliderHandle) {
        let isDragging = false;
        let startX = 0;
        let startLeft = 50; // Start at 50% (middle)
        
        const sliderWrapper = backgroundSlider.querySelector('.slider-wrapper');
        const sliderBefore = backgroundSlider.querySelector('.slider-image-before');
        const sliderAfter = backgroundSlider.querySelector('.slider-image-after');
        
        function updateSlider(percentage) {
            // Clamp percentage between 0 and 100
            percentage = Math.max(0, Math.min(100, percentage));
            
            // Update handle position
            backgroundSliderHandle.style.left = percentage + '%';
            
            // Update clip paths
            sliderBefore.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            sliderAfter.style.clipPath = `inset(0 0 0 ${percentage}%)`;
        }
        
        function handleMouseDown(e) {
            isDragging = true;
            startX = e.clientX || e.touches[0].clientX;
            startLeft = parseFloat(backgroundSliderHandle.style.left) || 50;
            e.preventDefault();
        }
        
        function handleMouseMove(e) {
            if (!isDragging) return;
            
            const currentX = e.clientX || (e.touches && e.touches[0].clientX);
            const rect = sliderWrapper.getBoundingClientRect();
            const deltaX = currentX - startX;
            const percentage = startLeft + (deltaX / rect.width) * 100;
            
            updateSlider(percentage);
        }
        
        function handleMouseUp() {
            isDragging = false;
        }
        
        // Mouse events
        backgroundSliderHandle.addEventListener('mousedown', handleMouseDown);
        backgroundSlider.addEventListener('mousedown', function(e) {
            if (e.target === backgroundSlider || e.target === sliderWrapper) {
                const rect = sliderWrapper.getBoundingClientRect();
                const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                updateSlider(percentage);
            }
        });
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        // Touch events for mobile
        backgroundSliderHandle.addEventListener('touchstart', handleMouseDown, { passive: false });
        backgroundSlider.addEventListener('touchstart', function(e) {
            if (e.target === backgroundSlider || e.target === sliderWrapper) {
                const rect = sliderWrapper.getBoundingClientRect();
                const touch = e.touches[0];
                const percentage = ((touch.clientX - rect.left) / rect.width) * 100;
                updateSlider(percentage);
            }
        }, { passive: false });
        
        document.addEventListener('touchmove', handleMouseMove, { passive: false });
        document.addEventListener('touchend', handleMouseUp);
        
        // Initialize slider at 50%
        updateSlider(50);
    }

    // Split-Screen Slider functionality for In-between Frames
    const inbetweenSlider = document.getElementById('inbetween-slider');
    const inbetweenSliderHandle = document.getElementById('inbetween-slider-handle');
    
    if (inbetweenSlider && inbetweenSliderHandle) {
        let isDragging = false;
        let startX = 0;
        let startLeft = 50; // Start at 50% (middle)
        
        const sliderWrapper = inbetweenSlider.querySelector('.slider-wrapper');
        const sliderBefore = inbetweenSlider.querySelector('.slider-image-before');
        const sliderAfter = inbetweenSlider.querySelector('.slider-image-after');
        
        function updateSlider(percentage) {
            // Clamp percentage between 0 and 100
            percentage = Math.max(0, Math.min(100, percentage));
            
            // Update handle position
            inbetweenSliderHandle.style.left = percentage + '%';
            
            // Update clip paths
            sliderBefore.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            sliderAfter.style.clipPath = `inset(0 0 0 ${percentage}%)`;
        }
        
        function handleMouseDown(e) {
            isDragging = true;
            startX = e.clientX || e.touches[0].clientX;
            startLeft = parseFloat(inbetweenSliderHandle.style.left) || 50;
            e.preventDefault();
        }
        
        function handleMouseMove(e) {
            if (!isDragging) return;
            
            const currentX = e.clientX || (e.touches && e.touches[0].clientX);
            const rect = sliderWrapper.getBoundingClientRect();
            const deltaX = currentX - startX;
            const percentage = startLeft + (deltaX / rect.width) * 100;
            
            updateSlider(percentage);
        }
        
        function handleMouseUp() {
            isDragging = false;
        }
        
        // Mouse events
        inbetweenSliderHandle.addEventListener('mousedown', handleMouseDown);
        inbetweenSlider.addEventListener('mousedown', function(e) {
            if (e.target === inbetweenSlider || e.target === sliderWrapper) {
                const rect = sliderWrapper.getBoundingClientRect();
                const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                updateSlider(percentage);
            }
        });
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        // Touch events for mobile
        inbetweenSliderHandle.addEventListener('touchstart', handleMouseDown, { passive: false });
        inbetweenSlider.addEventListener('touchstart', function(e) {
            if (e.target === inbetweenSlider || e.target === sliderWrapper) {
                const rect = sliderWrapper.getBoundingClientRect();
                const touch = e.touches[0];
                const percentage = ((touch.clientX - rect.left) / rect.width) * 100;
                updateSlider(percentage);
            }
        }, { passive: false });
        
        document.addEventListener('touchmove', handleMouseMove, { passive: false });
        document.addEventListener('touchend', handleMouseUp);
        
        // Initialize slider at 50%
        updateSlider(50);
    }

    // Flipbox functionality for Risk Challenges
    const flipboxHeaders = document.querySelectorAll('.flipbox-header');
    
    flipboxHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const flipboxId = this.getAttribute('data-flipbox');
            const content = document.getElementById(`flipbox-content-${flipboxId}`);
            const icon = this.querySelector('.flipbox-icon');
            
            if (content) {
                // Toggle active state
                const isActive = this.classList.contains('active');
                
                // Close all flipboxes first (optional - remove if you want multiple open)
                flipboxHeaders.forEach(h => {
                    h.classList.remove('active');
                    const c = document.getElementById(`flipbox-content-${h.getAttribute('data-flipbox')}`);
                    if (c) {
                        c.style.display = 'none';
                    }
                });
                
                // Toggle current flipbox
                if (!isActive) {
                    this.classList.add('active');
                    content.style.display = 'block';
                }
            }
        });
    });

    // Section Navigation functionality
    const nextSectionButtons = document.querySelectorAll('.next-section-btn');
    
    nextSectionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextSection = this.getAttribute('data-next');
            
            if (nextSection) {
                // Remove active class from all tabs and contents
                navTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Find and activate the target tab
                const targetTab = document.querySelector(`.nav-tab[data-tab="${nextSection}"]`);
                const targetContent = document.getElementById(nextSection);
                
                if (targetTab && targetContent) {
                    targetTab.classList.add('active');
                    targetContent.classList.add('active');
                    
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
    });

    // Prompt Selector functionality (Risk 2 - Knowledge Gap)
    const promptSelector = document.getElementById('prompt-selector');
    const promptImageContainer = document.getElementById('prompt-image-container');
    const promptImage = document.getElementById('prompt-image');
    
    if (promptSelector && promptImageContainer && promptImage) {
        promptSelector.addEventListener('change', function() {
            const selectedValue = this.value;
            
            if (selectedValue) {
                const imagePath = `assets/risks/Prompt${selectedValue}.png`;
                promptImage.src = imagePath;
                promptImage.alt = `Prompt ${selectedValue} result`;
                promptImageContainer.style.display = 'block';
            } else {
                promptImageContainer.style.display = 'none';
            }
        });
    }

    // Strategy Point Box functionality (Mitigation Measures)
    const strategyPointHeaders = document.querySelectorAll('.strategy-point-header');
    
    strategyPointHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const strategyId = this.getAttribute('data-strategy');
            const content = document.getElementById(`strategy-content-${strategyId}`);
            
            if (content) {
                // Check if this box is currently active
                const isActive = this.classList.contains('active');
                
                // Close all OTHER strategy points (excluding the clicked one)
                strategyPointHeaders.forEach(h => {
                    if (h !== this) { // Don't close the clicked box
                        h.classList.remove('active');
                        const c = document.getElementById(`strategy-content-${h.getAttribute('data-strategy')}`);
                        if (c) {
                            c.classList.remove('show');
                            // Wait for animation to complete before hiding
                            setTimeout(() => {
                                c.style.display = 'none';
                            }, 400);
                        }
                    }
                });
                
                // Toggle the clicked box
                if (isActive) {
                    // If it was active, close it
                    this.classList.remove('active');
                    content.classList.remove('show');
                    setTimeout(() => {
                        content.style.display = 'none';
                    }, 400);
                } else {
                    // If it wasn't active, open it
                    this.classList.add('active');
                    content.style.display = 'block';
                    // Use setTimeout to trigger animation
                    setTimeout(() => {
                        content.classList.add('show');
                    }, 10);
                }
            }
        });
    });
});

