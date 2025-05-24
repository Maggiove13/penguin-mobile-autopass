# Penguin Mobile Autopass

Aplicación móvil de gestión de contraseñas usando React Native, Expo y Autopass.

## 📋 Requisitos Previos

- Node.js v22.14.0 o superior
- npm v10.2.4 o superior
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (para desarrollo Android)
- Xcode (para desarrollo iOS, solo Mac)

## 🚀 Inicio Rápido

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/penguin-mobile-autopass.git
cd penguin-mobile-autopass
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Generar el Bundle del Backend o 
```bash
npm run bundle

 npx bare-pack --target ios --target android  --linked --out app/app.bundle.mjs backend/backend.mjs
```

## 📱 Ejecutar en Dispositivos (debug-mode)

### Android
1. Conecta tu dispositivo Android o inicia un emulador
2. Presiona 'a' en la terminal donde está corriendo `npm start`
3. O ejecuta directamente:
```bash
npm run android
```

### iOS
1. Conecta tu dispositivo iOS o inicia un simulador
2. Presiona 'i' en la terminal donde está corriendo `npm start`
3. O ejecuta directamente:
```bash
npm run ios
```

## 📦 Construir Versiones de Release

### Android (AAB - Android App Bundle)

1. **Preparación**
   ```bash
   # Generar el bundle del backend
   npm run bundle
   
   # Limpiar la build anterior
   cd android
   ./gradlew clean
   ```

2. **Generar AAB desde Android Studio**
   - Abre el proyecto en Android Studio
   - Selecciona `Build > Generate Signed Bundle / APK`
   - Elige `Android App Bundle`
   - Si no tienes un keystore:
     - Crea uno nuevo con `Create new`
     - Rellena los datos del keystore
     - Guarda el archivo y las contraseñas
   - Selecciona `release` como variante de build
   - Haz clic en `Finish`

### iOS (IPA)

1. **Preparación**
   ```bash
   # Generar el bundle del backend
   npm run bundle
   
   # Instalar pods
   cd ios
   pod install
   ```

2. **Generar IPA desde Xcode**
   - Abre el proyecto en Xcode (`ios/penguinmobileautopass.xcworkspace`)
   - Selecciona el target `penguinmobileautopass`
   - En `Signing & Capabilities`:
     - Selecciona tu equipo de desarrollo
     - Asegúrate de tener un perfil de aprovisionamiento válido
   - Selecciona `Product > Archive`
   - En el Organizador de Archivos:
     - Selecciona el archivo más reciente
     - Haz clic en `Distribute App`
     - Sigue el asistente de distribución


### Notas Importantes

1. **Android**
   - Guarda el keystore y sus contraseñas en un lugar seguro
   - El keystore es necesario para todas las actualizaciones futuras
   - El AAB es el formato recomendado para Google Play Store

2. **iOS**
   - Necesitas una cuenta de desarrollador de Apple
   - El perfil de aprovisionamiento debe estar actualizado
   - La firma debe coincidir con tu cuenta de desarrollador

## 🔧 Archivos de Configuración Importantes del proyecto

### Frontend
- [app/index.tsx](app/index.tsx) - Componente principal de la aplicación
- [app.json](app.json) - Configuración de Expo
- [package.json](package.json) - Dependencias y scripts del proyecto

### Backend
- [backend/backend.mjs](backend/backend.mjs) - Código del backend
- [app/app.bundle.mjs](app/app.bundle.mjs) - Bundle generado del backend

### Android
- [android/app/build.gradle](android/app/build.gradle) - Configuración de la aplicación Android
- [android/build.gradle](android/build.gradle) - Configuración del proyecto Android

## 🛠️ Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run android` - Ejecuta la app en Android
- `npm run ios` - Ejecuta la app en iOS
- `npm run bundle` - Genera el bundle del backend
- `npx bare-pack --target ios --target android  --linked --out app/app.bundle.mjs backend/backend.mjs` - Genera el bundle del backend


## 📦 Estructura del Proyecto

```
penguin-mobile-autopass/
├── app/
│   ├── app.bundle.mjs    # Bundle del backend
│   └── index.tsx         # Componente principal de React Native
├── backend/
│   └── backend.mjs       # Código del backend
├── assets/              # Recursos estáticos
├── node_modules/        # Dependencias
├── package.json         # Configuración del proyecto
└── README.md           # Este archivo
```

## Configuración de Android

### Configuración del build.gradle (Nivel de Proyecto)
```gradle
buildscript {
    ext {
        buildToolsVersion = "33.0.0"
        minSdkVersion = 21
        compileSdkVersion = 33
        targetSdkVersion = 33
        ndkVersion = "23.1.7779620"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:7.3.1")
        classpath("com.facebook.react:react-native-gradle-plugin")
    }
}
```

### Configuración del build.gradle (Nivel de App)
```gradle
apply plugin: "com.android.application"
apply plugin: "com.facebook.react"

android {
    namespace "com.penguinmobileautopass"
    compileSdkVersion rootProject.ext.compileSdkVersion

    defaultConfig {
        applicationId "com.penguinmobileautopass"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }

    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        // Configuración para release (agregar cuando sea necesario)
    }

    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            signingConfig signingConfigs.debug // Cambiar a release cuando esté listo
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}

dependencies {
    implementation("com.facebook.react:react-android")
    implementation("com.facebook.react:hermes-android")
    // Otras dependencias necesarias
}
```

### Configuración del AndroidManifest.xml
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <!-- Otros permisos necesarios -->

    <application
        android:name=".MainApplication"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="false"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode"
            android:launchMode="singleTask"
            android:windowSoftInputMode="adjustResize"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

### Configuraciones Importantes

1. **Versiones de SDK**:
   - compileSdkVersion: 33 (Android 13)
   - targetSdkVersion: 33
   - minSdkVersion: 21 (Android 5.0)

2. **Gradle**:
   - Versión de Gradle: 7.5.1
   - Versión del plugin de Android: 7.3.1

3. **Configuración de ProGuard**:
   - Habilitado para builds de release
   - Archivo de reglas: `proguard-rules.pro`

4. **Firma de la App**:
   - Debug: Usa el keystore por defecto
   - Release: Requiere configuración de keystore personalizado



5. **Agregar Crash de prueba para Crashlitycs**: 

- Abrí MainActivity.kt y dentro del método onCreate, agregá lo siguiente:

```MainActivity.kt
import com.google.firebase.crashlytics.FirebaseCrashlytics
import android.os.Bundle

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 💥 Crash for testing
        FirebaseCrashlytics.getInstance().setCrashlyticsCollectionEnabled(true)
        FirebaseCrashlytics.getInstance().log("Crash de prueba registrado manualmente")
        FirebaseCrashlytics.getInstance().sendUnsentReports()

        throw RuntimeException("Crash real de prueba desde MainActivity.kt")
    }
}
```

Una vez que se reciba los crash de crashlitycs comentar esta seccion