/* Copyright 2026 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ */
package cn.zhuatech.policyai.practical;

import java.util.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
@RestController
@RequestMapping("/api/practical")
public class PracticalController {
  private final PracticalService service;
  private final cn.zhuatech.policyai.Auth auth;

  /** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
  public PracticalController(PracticalService service, cn.zhuatech.policyai.Auth auth) {
    this.service = service;
    this.auth = auth;
  }

  /** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
  @PostMapping("/policy-control-version-diff")
  public ResponseEntity<Map<String, Object>> compute(
      @RequestBody String raw,
      @RequestHeader(value = "Authorization", required = false) String authorization) {
    try {
      auth.current(authorization);
    } catch (cn.zhuatech.policyai.Model.Failure ex) {
      return ResponseEntity.status(ex.status)
          .body(Map.of("success", false, "message", ex.getMessage()));
    }
    try {
      return ResponseEntity.ok(
          Map.of(
              "success",
              true,
              "message",
              "处理完成；未变更业务记录",
              "data",
              PracticalInput.jsonSafe(service.execute(PracticalInput.parseJson(raw)))));
    } catch (IllegalArgumentException ex) {
      return ResponseEntity.badRequest().body(Map.of("success", false, "message", ex.getMessage()));
    }
  }
}
