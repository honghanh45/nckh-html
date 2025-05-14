document.addEventListener('DOMContentLoaded', function() {
    updateText();
    initLocationAndHospitals();
    setupEventListeners();
    loadFormData();
    loadHospitalSuggestions(); // Load hospital suggestions after form is set up
});

// Dữ liệu ngôn ngữ tiếng Việt được lồng trực tiếp vào JavaScript
const languageData = {
    "bookingTitle": "Đặt lịch khám tại cơ sở",
    "patientName": "Họ và tên",
    "patientNamePlaceholder": "Nhập họ và tên",
    "phoneNumber": "Số điện thoại",
    "phoneNumberPlaceholder": "Nhập số điện thoại",
    "email": "Email",
    "emailPlaceholder": "Nhập email",
    "gender": "Giới tính",
    "chooseGender": "Chọn giới tính",
    "provinceCity": "Tỉnh/Thành phố",
    "chooseProvinceCity": "Chọn Tỉnh/Thành phố",
    "district": "Quận/Huyện",
    "chooseDistrict": "Chọn Quận/Huyện",
    "address": "Địa chỉ",
    "addressPlaceholder": "Nhập địa chỉ",
    "areaOfExamination": "Khu vực khám",
    "chooseArea": "Chọn khu vực",
    "facility": "Cơ sở khám",
    "chooseFacility": "Chọn cơ sở khám",
    "hospital": "Bệnh viện",
    "chooseHospital": "Chọn bệnh viện",
    "specialty": "Chuyên khoa",
    "chooseSpecialty": "Chọn chuyên khoa",
    "doctor": "Bác sĩ",
    "chooseDoctor": "Chọn bác sĩ",
    "nextButton": "Tiếp theo",
    "nearestHospital": "Bệnh viện gần nhất",
    "bookingLink": "Đặt lịch khám tại bệnh viện này",
    "specialtyInfo": "Thông tin chuyên khoa",
    "workingHours": "Giờ làm việc",
    "directionsMap": "Bản đồ đường đi",
    "safeTripNotification": "Chúc quý khách có một chuyến đi an toàn!",
    "geolocationNotSupported": "Trình duyệt không hỗ trợ định vị.",
    "geolocationError": "Lỗi định vị: ",
    "permissionDenied": "Bạn đã từ chối yêu cầu định vị.",
    "positionUnavailable": "Thông tin vị trí không khả dụng.",
    "timeoutError": "Yêu cầu định vị đã hết thời gian.",
    "unknownError": "Lỗi không xác định đã xảy ra.",
    "ipGeolocationError": "Lỗi định vị IP: ",
    "ipGeolocationFailed": "Không thể xác định vị trí dựa trên IP.",
    "chosenSpecialty": "Bạn đã chọn chuyên khoa: ",
    "cardiologyWorkingHours": "Chuyên khoa Tim mạch làm việc từ 7:30 - 17:00 các ngày trong tuần.",
    "endocrinologyWorkingHours": "Chuyên khoa Nội tiết làm việc từ 8:00 AM to 4:30 PM from Monday to Friday.",
    "pediatricsWorkingHours": "Chuyên khoa Nhi khoa làm việc 24/7.",
    "chooseSpecialtyForHours": "Vui lòng chọn chuyên khoa để xem giờ làm việc.",
    "nextStepFunctionality": "Chức năng \"Tiếp theo\" đang được phát triển.",
    "latitude": "Vĩ độ:",
    "longitude": "Kinh độ:",
    "undefinedSpecialty": "Không xác định",
    "dateOfBirth": "Ngày sinh",
    "noHospitalFound": "Không tìm thấy bệnh viện nào gần vị trí của bạn.",
    "chooseHospitalFirst": "Vui lòng chọn bệnh viện trước.",
    "chooseFacilityFirst": "Vui lòng chọn cơ sở khám trước.",
    "invalidEmail": "Email không hợp lệ. Vui lòng nhập đúng định dạng email.",
    "hospitalSuggestionLoading": "Đang tìm bệnh viện gần bạn...",
    "hospitalSuggestionError": "Không thể tải gợi ý bệnh viện."
};

function updateText() {
    document.title = languageData.bookingTitle;
    document.querySelector('.booking-container h2').textContent = languageData.bookingTitle;
    document.querySelector('.form-title').textContent = languageData.bookingTitle;
    document.querySelector('label[for="patient-name"]').textContent = languageData.patientName;
    document.getElementById("patient-name").placeholder = languageData.patientNamePlaceholder;
    document.querySelector('label[for="phone-number"]').textContent = languageData.phoneNumber;
    document.getElementById("phone-number").placeholder = languageData.phoneNumberPlaceholder;
    document.querySelector('label[for="email"]').textContent = languageData.email;
    document.getElementById("email").placeholder = languageData.emailPlaceholder;
    document.querySelector('label[for="gender"]').textContent = languageData.gender;
    document.querySelector('#gender option[value=""]').textContent = languageData.chooseGender;
    document.querySelector('label[for="province-city"]').textContent = languageData.provinceCity;
    document.querySelector('#province-city option[value=""]').textContent = languageData.chooseProvinceCity;
    document.querySelector('label[for="district"]').textContent = languageData.district;
    document.querySelector('#district option[value=""]').textContent = languageData.chooseDistrict;
    document.querySelector('label[for="address"]').textContent = languageData.address;
    document.getElementById("address").placeholder = languageData.addressPlaceholder;
    document.querySelector('label[for="area"]').textContent = languageData.areaOfExamination;
    document.querySelector('#area option[value=""]').textContent = languageData.chooseArea;
    document.querySelector('label[for="facility"]').textContent = languageData.facility;
    document.querySelector('#facility option[value=""]').textContent = languageData.chooseFacility;
    document.querySelector('label[for="specialty"]').textContent = languageData.specialty;
    document.querySelector('#specialty option[value=""]').textContent = languageData.chooseSpecialty;
    document.querySelector('button').textContent = languageData.nextButton;
    document.querySelector('#hospital-suggestion h3').textContent = languageData.nearestHospital;
    document.querySelector('#hospital-suggestion-text').textContent = languageData.hospitalSuggestionLoading;
    document.querySelector('#hospital-suggestion a').textContent = languageData.bookingLink;
    document.querySelector('#specialty-section h3').textContent = languageData.specialtyInfo;
    document.querySelector('#working-hours-section h3').textContent = languageData.workingHours;
    document.querySelector('#map-section h3').textContent = languageData.directionsMap;
    document.querySelector('#notification-safe-trip').textContent = languageData.safeTripNotification;
    document.querySelector('label[for="date-of-birth"]').textContent = languageData.dateOfBirth;
    document.querySelector('label[for="facility"]').textContent = languageData.facility;
    document.querySelector('label[for="area"]').textContent = languageData.areaOfExamination;
}

let userLocation = null;
let hospitals = [];
let selectedHospitalPlaceId = null;
let facilities = [];
let selectedFacilityPlaceId = null;
const hospitalNames = ["Bệnh viện Phương Đông", "Bệnh viện 5 Sao Hà Nội"]; // List of hospitals to consider

function setupEventListeners() {
    const districtSelect = document.getElementById('district');
    const facilitySelect = document.getElementById('facility');
    const specialtySelect = document.getElementById('specialty');
    const nextButton = document.querySelector('button');
    const addressInput = document.getElementById('address');

    facilitySelect.addEventListener('change', function() {
        const selectedFacilityValue = this.value;
        if (selectedFacilityValue) {
            selectedFacilityPlaceId = selectedFacilityValue;
            loadSpecialties(selectedFacilityPlaceId);
        } else {
            specialtySelect.innerHTML = '<option value="">' + languageData.chooseSpecialty + '</option>';
        }
    });

    districtSelect.addEventListener('change', function() {
        clearHospitalFacilitySpecialty();
        loadHospitalsBasedOnLocation();
    });

    nextButton.addEventListener('click', function(event) {
        if (!validateEmail()) {
            event.preventDefault();
        } else {
            saveFormData();
            nextStep();
        }
    });

    addressInput.addEventListener('blur', function() {
        clearHospitalFacilitySpecialty();
        loadHospitalsBasedOnLocation();
    });
}


function clearHospitalFacilitySpecialty() {
    const hospitalSelect = document.getElementById('facility');
    const facilitySelect = document.getElementById('facility');
    const specialtySelect = document.getElementById('specialty');

    hospitalSelect.innerHTML = '<option value="">' + languageData.chooseHospital + '</option>';
    facilitySelect.innerHTML = '<option value="">' + languageData.chooseFacility + '</option>';
    specialtySelect.innerHTML = '<option value="">' + languageData.chooseSpecialty + '</option>';

    hospitals = [];
    facilities = [];
    selectedHospitalPlaceId = null;
    selectedFacilityPlaceId = null;
}


function initLocationAndHospitals() {
    getIPLocation(); // Try to get location based on IP first
}


async function getIPLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.latitude && data.longitude) {
            userLocation = { latitude: data.latitude, longitude: data.longitude };
            showPositionFromIP(data);
        } else {
            handleIPLocationError("Invalid IP geolocation data received.");
            getBrowserLocation(); // Fallback to browser geolocation if IP fails
        }
    } catch (error) {
        console.error("IP Geolocation error:", error);
        handleIPLocationError(error.message);
        getBrowserLocation(); // Fallback to browser geolocation if IP fetch fails
    }
}

function showPositionFromIP(data) {
    const addressInput = document.getElementById("address");
     addressInput.value = `${languageData.latitude} ${data.latitude}, ${languageData.longitude} ${data.longitude} (IP based)`;
}


function handleIPLocationError(message) {
    console.warn("IP Geolocation failed:", message);
    document.getElementById("address").placeholder = `${languageData.ipGeolocationError} ${languageData.ipGeolocationFailed} ${message}`;
}


function getBrowserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                if (!userLocation) { // Only update userLocation if not already set by IP geolocation
                    userLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                    showPosition(position);
                }
            },
            handleLocationError,
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 30000
            }
        );
    } else {
        document.getElementById("address").placeholder = languageData.geolocationNotSupported;
    }
}


function showPosition(position) {
    const addressInput = document.getElementById("address");
    addressInput.value = `${languageData.latitude} ${position.coords.latitude}, ${languageData.longitude} ${position.coords.longitude} (Browser based)`;
}


function handleLocationError(error) {
    let message;
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = languageData.permissionDenied;
            break;
        case error.POSITION_UNAVAILABLE:
            message = languageData.positionUnavailable;
            break;
        case error.TIMEOUT:
            message = languageData.timeoutError;
            break;
        case error.UNKNOWN_ERROR:
            message = languageData.unknownError;
            break;
    }
    document.getElementById("address").placeholder = `${languageData.geolocationError} ${message}`;
}


async function loadHospitalSuggestions() {
    const hospitalSuggestionText = document.getElementById('hospital-suggestion-text');
    const hospitalBookingLink = document.getElementById('hospital-booking-link');
    hospitalSuggestionText.textContent = languageData.hospitalSuggestionLoading;
    hospitalBookingLink.style.display = 'none'; // Hide booking link initially

    if (!userLocation) {
        hospitalSuggestionText.textContent = languageData.hospitalSuggestionError + " " + languageData.ipGeolocationFailed;
        return;
    }

    try {
        const hospitalPlaceDetails = await getHospitalPlaceDetails(hospitalNames);
        if (hospitalPlaceDetails && hospitalPlaceDetails.length === 2) {
            const hospital1 = hospitalPlaceDetails[0]; // Bệnh viện Phương Đông
            const hospital2 = hospitalPlaceDetails[1]; // Bệnh viện 5 Sao Hà Nội

            const distance1 = calculateDistance(userLocation, hospital1.location);
            const distance2 = calculateDistance(userLocation, hospital2.location);

            let closerHospital, fartherHospital;
            if (distance1 < distance2) {
                closerHospital = hospital1;
                fartherHospital = hospital2;
            } else {
                closerHospital = hospital2;
                fartherHospital = hospital1;
            }

            hospitalSuggestionText.textContent = `${closerHospital.name} ${languageData.nearestHospital}`;
            hospitalBookingLink.href = closerHospital.website || closerHospital.mapUrl || "#"; // Use website or map URL if available, otherwise placeholder
            hospitalBookingLink.style.display = 'inline'; // Show booking link
        } else {
             hospitalSuggestionText.textContent = languageData.hospitalSuggestionError;
        }

    } catch (error) {
        console.error("Error loading hospital suggestions:", error);
        hospitalSuggestionText.textContent = languageData.hospitalSuggestionError + " " + error.message;
    }
}


async function getHospitalPlaceDetails(hospitalNames) {
    const places = [];
    for (const name of hospitalNames) {
        try {
            const summaryPlacesResult = await Google Maps({
                query: [name],
                location_bias: `${userLocation.latitude},${userLocation.longitude}`
            });

            if (summaryPlacesResult && summaryPlacesResult.places && summaryPlacesResult.places.length > 0) {
                const place = summaryPlacesResult.places[0];
                places.push({
                    name: place.name,
                    location: { latitude: parseFloat(place.address.split(',')[0]), longitude: parseFloat(place.address.split(',')[1]) }, // Extract lat/long from address - IMPROVE this!
                    mapUrl: place.map_url,
                    website: place.url
                });
            }
        } catch (error) {
            console.error(`Error fetching place details for ${name}:`, error);
        }
    }
    return places;
}


function calculateDistance(location1, location2) {
    const lat1 = location1.latitude;
    const lon1 = location1.longitude;
    const lat2 = location2.latitude;
    const lon2 = location2.longitude;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

function toRad(degrees) {
    return degrees * Math.PI / 180;
}


function loadHospitalsBasedOnLocation() {
    const district = document.getElementById('district').value;
    const address = document.getElementById('address').value.trim();
    let locationBias = "Hanoi, Vietnam";
    let query = ["hospital in Hanoi"];

    if (address && address !== "") {
        locationBias = address;
        query = [`hospital near ${address}`];
    } else if (district && district !== "") {
        locationBias = district + ", Hanoi, Vietnam";
        query = [`hospital in ${district}, Hanoi`];
    } else if (userLocation) {
        locationBias = `${userLocation.latitude},${userLocation.longitude}`;
        query = ["hospital near me"];
    }

    loadNearbyHospitals(query, locationBias);
}



async function loadNearbyHospitals(query, locationBias) {
    const hospitalSelect = document.getElementById('facility');
    hospitalSelect.innerHTML = '<option value="">' + languageData.chooseHospital + '</option>';


    const priceLevels = [];
    const minRating = 3.5;
    const onlyOpenNow = true;


    let summaryPlacesResult;
    try {
        summaryPlacesResult = await Google Maps({
            query: query,
            location_bias: locationBias,
            only_open_now: onlyOpenNow,
            min_rating: minRating,
            rank_preference: "DISTANCE"
        });
    } catch (error) {
        console.error("Error calling Google Maps:", error);
        hospitalSelect.innerHTML = '<option value="">' + languageData.noHospitalFound + '</option>';
        return;
    }


    if (typeof summaryPlacesResult === 'string') {
        console.error("Google Maps API error:", summaryPlacesResult);
        hospitalSelect.innerHTML = '<option value="">' + languageData.noHospitalFound + '</option>';
        return;
    }


    if (summaryPlacesResult.places && summaryPlacesResult.places.length > 0) {
        hospitals = summaryPlacesResult.places;

        hospitals.forEach(hospital => {
            if (hospital.name && hospital.id) {
                const option = document.createElement('option');
                option.value = hospital.id;
                option.textContent = hospital.name;
                hospitalSelect.appendChild(option);
            }
        });
    } else {
        hospitalSelect.innerHTML = '<option value="">' + languageData.noHospitalFound + '</option>';
    }
}



async function loadFacilities(hospitalPlaceId) {
    const facilitySelect = document.getElementById('facility');
    facilitySelect.innerHTML = '<option value="">' + languageData.chooseFacility + '</option>';
    facilities = [];
    selectedFacilityPlaceId = null;

    if (!hospitalPlaceId) {
        facilitySelect.innerHTML = '<option value="">' + languageData.chooseHospitalFirst + '</option>';
        return;
    }

    let analyzeResult;
    try {
        analyzeResult = await Google Maps({
            place_ids: [hospitalPlaceId],
            question: "list of branches in Hanoi"
        });
    } catch (error) {
        console.error("Error calling Google Maps for facilities:", error);
        facilitySelect.innerHTML = '<option value="">' + languageData.chooseFacilityFirst + '</option>';
        return;
    }

     if (analyzeResult && analyzeResult.web_answers && analyzeResult.web_answers.length > 0) {
        const answer = analyzeResult.web_answers[0].answer;
        if (answer) {
            const facilityNames = answer.split(/, | and |\n/).filter(name => name.trim() !== "");

            if (facilityNames.length > 0) {
                 facilityNames.forEach(facilityName => {
                    const option = document.createElement('option');
                    option.value = facilityName;
                    option.textContent = facilityName;
                    facilitySelect.appendChild(option);
                    facilities.push({name: facilityName, id: facilityName});
                });
            } else {
                facilitySelect.innerHTML = '<option value="">' + languageData.chooseFacilityFirst + '</option>';
            }


        } else {
            facilitySelect.innerHTML = '<option value="">' + languageData.chooseFacilityFirst + '</option>';
        }


    } else {
         facilitySelect.innerHTML = '<option value="">' + languageData.chooseFacilityFirst + '</option>';
    }
}



async function loadSpecialties(facilityPlaceId) {
    const specialtySelect = document.getElementById('specialty');
    specialtySelect.innerHTML = '<option value="">' + languageData.chooseSpecialty + '</option>';

    if (!facilityPlaceId) {
        specialtySelect.innerHTML = '<option value="">' + languageData.chooseFacilityFirst + '</option>';
        return;
    }


    let analyzeResult;
    try {
        analyzeResult = await Google Maps({
            place_ids: [facilityPlaceId],
            question: "what specialties are available?"
        });
    } catch (error) {
        console.error("Error calling Google Maps for specialties:", error);
        specialtySelect.innerHTML = '<option value="">' + languageData.chooseSpecialtyFirst + '</option>';
        return;
    }


    if (analyzeResult && analyzeResult.web_answers && analyzeResult.web_answers.length > 0) {
        const answer = analyzeResult.web_answers[0].answer;
        if (answer) {
            const specialtyList = answer.split(/, | and |\n/).filter(spec => spec.trim() !== "");

             if (specialtyList.length > 0) {
                specialtyList.forEach(specialtyName => {
                    const option = document.createElement('option');
                    option.value = specialtyName;
                    option.textContent = specialtyName;
                    specialtySelect.appendChild(option);
                });
            } else {
                specialtySelect.innerHTML = '<option value="">' + languageData.chooseFacilityFirst + '</option>';
            }


        } else {
             specialtySelect.innerHTML = '<option value="">' + languageData.chooseFacilityFirst + '</option>';
        }

    }
     else {
         specialtySelect.innerHTML = '<option value="">' + languageData.chooseFacilityFirst + '</option>';
    }
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        alert(languageData.invalidEmail);
        emailInput.focus();
        return false;
    }
    return true;
}


function nextStep() {
    const selectedSpecialty = document.getElementById('specialty').value;

    if (selectedFacilityPlaceId) {
         alert(`${languageData.nextStepFunctionality} \n\n Cơ sở khám Place ID: ${selectedFacilityPlaceId} \n Chuyên khoa: ${selectedSpecialty}`);
    } else {
        alert(languageData.chooseFacilityFirst);
    }
}

function saveFormData() {
    const formData = {
        patientName: document.getElementById('patient-name').value,
        dateOfBirth: document.getElementById('date-of-birth').value,
        phoneNumber: document.getElementById('phone-number').value,
        email: document.getElementById('email').value,
        gender: document.getElementById('gender').value,
        district: document.getElementById('district').value,
        address: document.getElementById('address').value,
        facility: document.getElementById('facility').value,
        specialty: document.getElementById('specialty').value
    };
    localStorage.setItem('bookingFormData', JSON.stringify(formData));
}

function loadFormData() {
    const storedFormData = localStorage.getItem('bookingFormData');
    if (storedFormData) {
        const formData = JSON.parse(storedFormData);
        document.getElementById('patient-name').value = formData.patientName || '';
        document.getElementById('date-of-birth').value = formData.dateOfBirth || '';
        document.getElementById('phone-number').value = formData.phoneNumber || '';
        document.getElementById('email').value = formData.email || '';
        document.getElementById('gender').value = formData.gender || '';
        document.getElementById('district').value = formData.district || '';
        document.getElementById('address').value = formData.address || '';
        document.getElementById('facility').value = formData.facility || '';
        document.getElementById('specialty').value = formData.specialty || '';
    }
}


document.getElementById('facility').addEventListener('change', function() {
    const selectedHospitalValue = this.value;
    if (selectedHospitalValue) {
        selectedHospitalPlaceId = selectedHospitalValue;
        loadFacilities(selectedHospitalPlaceId);
    } else {
        const facilitySelect = document.getElementById('facility');
        facilitySelect.innerHTML = '<option value="">' + languageData.chooseFacility + '</option>';
        const specialtySelect = document.getElementById('specialty');
        specialtySelect.innerHTML = '<option value="">' + languageData.chooseSpecialty + '</option>';
        facilities = [];
        specialties = [];
        selectedHospitalPlaceId = null;
        selectedFacilityPlaceId = null;
    }
});


document.getElementById('google-map').addEventListener('click', function() {
    const notification = document.getElementById('notification-safe-trip');
    notification.classList.add('show');
    setTimeout(function() {
        notification.classList.remove('show');
    }, 3000);
});


function getSpecialtyName(specialtyValue) {
    switch (specialtyValue) {
        case 'tim-mach': return languageData.cardiology;
        case 'noi-tiet': return languageData.endocrinology;
        case 'nhi-khoa': return languageData.pediatrics;
        default: return languageData.undefinedSpecialty;
    }
}

function getWorkingHours(specialtyValue) {
    switch (specialtyValue) {
        case 'tim-mach': return languageData.cardiologyWorkingHours;
        case 'noi-tiet': return languageData.endocrinologyWorkingHours;
        case 'nhi-khoa': return languageData.pediatricsWorkingHours;
        default: return languageData.chooseSpecialtyForHours;
    }
}