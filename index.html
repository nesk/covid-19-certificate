<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="msapplication-TileColor" content="#603cba">
    <meta name="msapplication-config" content="./favicons/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">

    <link rel="apple-touch-icon" sizes="180x180" href="./favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./favicons/favicon-16x16.png">
    <link rel="manifest" href="./favicons/site.webmanifest">
    <link rel="mask-icon" href="./favicons/safari-pinned-tab.svg" color="#21bf73">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css">

    <title>COVID-19 – Générateur d'attestation de déplacement</title>

    <style>
        body {
            padding: 20px;
        }

        h4, form, footer, #alert-official {
            margin: 30px auto;
            max-width: 400px;
        }

        footer {
            margin-top: 40px;
        }

        canvas {
            border: 1px solid #ced4da;
            border-radius: .25rem;
        }

        #form-profile .form-check {
            margin-bottom: 1rem;
        }

        #form-profile .form-check-label {
            font-size: 80%;
            font-weight: 400;
            transform: translateY(-2px);
        }

        #form-generate .form-check {
            margin: 10px;
        }

        #alert-facebook {
            position: fixed;
            top: 10px;
            left: 10px;
            right: 10px;
        }

        #alert-official {
            margin: 1rem auto 0;
        }

        #date-selector-group {
            position: relative;
            overflow: hidden;
        }

        #date-selector {
            position: absolute;
            top: 0;
            left: 50%;
            height: 100%;
            transform: translateX(-50%); /* center the input to avoid reset buttons */
            opacity: 0;
            z-index: 1;
            cursor: pointer;
        }

        svg {
            height: 1em;
        }

        .close {
            margin: 0 0 15px 15px;
        }

        .btn-loader:not([disabled]) svg {
            display: none;
        }

        .btn-loader[disabled] {
            position: relative;
            padding-right: 2.5rem;
        }

        .btn-loader[disabled] svg {
            position: absolute;
            top: 50%;
            right: .75rem;
            animation: svg-button-spin 1000ms infinite ease;
        }

        @keyframes svg-button-spin {
            from { transform: translateY(-50%) rotate(0deg); }
            to { transform: translateY(-50%) rotate(360deg); }
        }
    </style>
</head>
<body>
    <h4>COVID-19 – Générateur d'attestation de déplacement</h4>

    <div class="alert alert-success" role="alert" id="alert-official">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>

        <p><small>
            <a href="https://media.interieur.gouv.fr/deplacement-covid-19/">
                🇫🇷 Le gouvernement a publié son propre générateur !
            </a>
            Il a été développé à partir de mon code (🥳), la confidentialité de vos données reste donc identique, et
            il vous permettra de présenter votre attestation sur smartphone.
        </small></p>

        <small>
            Mon outil restera en place mais je ne continuerai pas à le maintenir, je l'avais créé afin de faciliter le
            remplissage des attestations, maintenant il ne me semble plus nécessaire.
            <br>Merci pour votre soutien à tous.&nbsp;🙏
        </small>
    </div>

    <form id="form-profile" style="display: none">
        <div class="alert alert-primary" role="alert">
            <small>
                <p>
                    Ce générateur est là pour faciliter l'usage des attestations. Les données sont stockées
                    <u>exclusivement</u> sur votre téléphone et le code peut être consulté
                    <a href="https://github.com/nesk/covid-19-certificate">sur Github</a>.
                </p>
                <a href="https://www.interieur.gouv.fr/Actualites/L-actu-du-Ministere/Attestation-de-deplacement-derogatoire-et-justificatif-de-deplacement-professionnel">
                    Plus d'informations sur le site officiel du gouvernement.
                </a>
            </small>
        </div>

        <h5>Remplissez votre profil</h5>

        <div class="form-group">
            <label for="field-name">Nom et prénom</label>
            <input type="text" class="form-control" id="field-name" name="name" autofocus>
        </div>

        <div class="form-group">
            <label for="field-birthday">Date de naissance</label>
            <div class="input-group">
                <input type="text" class="form-control" id="field-birthday" name="birthday">
                <div class="input-group-append" id="date-selector-group">
                    <input type="date" id="date-selector">
                    <span class="input-group-text text-primary">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar-alt" class="svg-inline--fa fa-calendar-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path></svg>
                    </span>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="field-birthplace">Lieu de naissance</label>
            <input type="text" class="form-control" id="field-birthplace" name="birthplace">
        </div>

        <div class="form-group">
            <label for="field-address">Adresse</label>
            <input type="text" class="form-control" id="field-address" name="address">
        </div>

        <div class="form-group">
            <label for="field-town">Ville</label>
            <input type="text" class="form-control" id="field-town" name="town">
        </div>

        <div class="form-group">
            <label for="field-zipcode">Code Postal</label>
            <input type="text" class="form-control" id="field-zipcode" name="zipcode">
        </div>

        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="check-same-town" checked>
            <label class="form-check-label" for="check-same-town">Je réside actuellement à cette adresse</label>
        </div>

        <div class="form-group" id="group-done-at" style="display: none">
            <label for="field-done-at">Fait à</label>
            <input type="text" class="form-control" id="field-done-at" name="done-at" disabled>
        </div>

        <div class="form-group">
            <label>Signature</label>
            <small id="help-signature" class="form-text text-muted">Dessinez votre signature dans la case ci-dessous.</small>
            <canvas id="field-signature" width=360 height=240 aria-describedby="help-signature"></canvas>
            <button id="reset-signature" type="button" class="btn btn-link btn-sm float-right">Effacer la signature</button>
            <br><br>
        </div>

        <button type="submit" class="btn btn-primary">Enregistrer mon profil</button>
    </form>

    <form id="form-generate" style="display: none">
        <div class="alert alert-warning" role="alert">
            <small>
                Si vous n'avez pas besoin de sortir, <u>restez chez vous</u> ! Ce générateur est là pour faciliter les
                sorties <u>justifiées</u>. Veillez à prendre soin de vous et des autres en limitant la
                propagation du virus. 🦠 😷
            </small>
        </div>

        <h5>Choisissez un motif de sortie</h5>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="field-reason" id="radio-work" value="work" checked>
            <label class="form-check-label" for="radio-work">Travail</label>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="field-reason" id="radio-groceries" value="groceries">
            <label class="form-check-label" for="radio-groceries">Courses</label>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="field-reason" id="radio-health" value="health">
            <label class="form-check-label" for="radio-health">Santé</label>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="field-reason" id="radio-family" value="family">
            <label class="form-check-label" for="radio-family">Famille</label>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="field-reason" id="radio-sport" value="sport">
            <label class="form-check-label" for="radio-sport">Sport &amp; animaux</label>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="field-reason" id="radio-notification" value="notification">
            <label class="form-check-label" for="radio-notification">Convocation Judiciaire</label>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="field-reason" id="radio-mission" value="mission">
            <label class="form-check-label" for="radio-mission">Mission d'intérêt général</label>
        </div>

        <hr>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="field-reason" id="radio-none" value="">
            <label class="form-check-label" for="radio-none">Aucun (remplissage manuel)</label>
        </div>

        <br><br>
        <button type="submit" class="btn btn-primary btn-loader">
            Imprimer mon attestation
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-notch" class="svg-inline--fa fa-circle-notch fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"></path></svg>
        </button>

        <br><br>
        <button type="button" class="btn btn-link btn-sm" onclick="localStorage.clear(); location.reload()">
            Effacer mon profil
        </button>
    </form>

    <footer class="footer text-center">
        <small>
            <a href="https://github.com/nesk/covid-19-certificate">Github</a>
            -
            <a href="https://nesk.dev">nesk.dev</a>
            -
            <a href="https://twitter.com/johannpardanaud">@johannpardanaud</a>
        </small>
    </footer>

    <div class="alert alert-danger" role="alert" style="display: none" id="alert-facebook">
        ATTENTION !! Vous utilisez actuellement le navigateur Facebook, ce générateur ne fonctionne pas correctement au
        sein de ce navigateur ! Merci d'ouvrir Chrome sur Android ou bien Safari sur iOS.
    </div>

    <script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.4.1/dist/pdf-lib.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js"></script>
    <script src="certificate.js?v=183293d064f4724dacd086cb5cfeee72d758ad3d"></script>
</body>
</html>
