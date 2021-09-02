//package com.codecool.pantry.controller.appuser;
//
//import com.codecool.pantry.entity.appuser.AppUser;
//import com.codecool.pantry.security.config.JwtTokenProvider;
//import com.codecool.pantry.service.appuser.AppUserService;
//import lombok.AllArgsConstructor;
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping()
//@AllArgsConstructor
//public class AppUserController {
//
//    private final AppUserService service;
//    private AuthenticationManager authenticationManager;
//    private JwtTokenProvider tokenProvider;
////    private UserRepository userRepository;
//
//
//    @PutMapping(path = "api/v1/user/{user_id}")
//    public String createPantry(@PathVariable Long userId, String name) {
//        return null;
//    }
//
//    /*@CrossOrigin(origins = "http://localhost/")
//    @GetMapping
//    public AppUser getUser(Authentication authentication) {
//        AppUser user = null;
//        UserDetails details = (UserDetails) authentication.getPrincipal();
//        if (details != null) {
//            user = (AppUser) service.loadUserByUsername(details.getUsername());
//        }
//
//        return user;
//    }*/
//
//
//    @GetMapping(path = "/default")
//    public AppUser getDefaultUser() {
//        AppUser appUser = service.getUserByEmail("user@pantry.hu");
//        System.out.println("---appUser: " + appUser);
//        return appUser;
//    }
//
//    @PostMapping(value = "/api/v1/user/authenticate", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<String> authenticate(@RequestBody AppUser user) {
//        JSONObject jsonObject = new JSONObject();
//        try {
//            Authentication authentication = authenticationManager
//                    .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
//            if (authentication.isAuthenticated()) {
//                String email = user.getEmail();
//                jsonObject.put("name", authentication.getName());
//                jsonObject.put("authorities", authentication.getAuthorities());
//                jsonObject.put("email", email);
//                jsonObject.put("token", tokenProvider.createToken(email));
//                return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
//            }
//        } catch (JSONException e) {
//            try {
//                jsonObject.put("exception", e.getMessage());
//            } catch (JSONException e1) {
//                e1.printStackTrace();
//            }
//            return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
//        }
//        return null;
//
//    }
//}
