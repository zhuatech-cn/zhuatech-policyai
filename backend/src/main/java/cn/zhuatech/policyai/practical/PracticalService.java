/* Copyright 2026 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ */
package cn.zhuatech.policyai.practical;

import static cn.zhuatech.policyai.practical.PracticalInput.*;

import java.math.*;
import java.util.*;
import org.springframework.stereotype.Service;

/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
@Service
public class PracticalService {
  /** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
  public Map<String, Object> execute(Map<String, Object> r) {
    validate(r);
    keys(r, "before", "after");
    Map<String, Map<String, Object>> before = new TreeMap<>(), after = new TreeMap<>();
    for (String side : List.of("before", "after")) {
      var target = side.equals("before") ? before : after;
      for (var c : rows(r, side, 0, 200)) {
        keys(c, "id", "owner", "statement", "reviewDays", "mandatory");
        String id = id(c, "id");
        text(c, "owner", 100);
        text(c, "statement", 4000);
        integer(c, "reviewDays", 1, 3650);
        flag(c, "mandatory");
        if (target.putIfAbsent(id, c) != null) throw new IllegalArgumentException("控制项重复");
      }
    }
    Set<String> ids = new TreeSet<>(before.keySet());
    ids.addAll(after.keySet());
    List<Map<String, Object>> changes = new ArrayList<>();
    for (String id : ids) {
      var a = before.get(id);
      var b = after.get(id);
      List<String> fields = new ArrayList<>();
      boolean tightened = false;
      String type;
      if (a == null) type = "ADDED";
      else if (b == null) type = "REMOVED";
      else {
        for (String k : List.of("owner", "statement", "reviewDays", "mandatory")) {
          boolean equal =
              k.equals("reviewDays")
                  ? integer(a, k, 1, 3650) == integer(b, k, 1, 3650)
                  : Objects.equals(a.get(k), b.get(k));
          if (!equal) fields.add(k);
        }
        if (fields.isEmpty()) continue;
        type = "CHANGED";
        tightened =
            !flag(a, "mandatory") && flag(b, "mandatory")
                || integer(b, "reviewDays", 1, 3650) < integer(a, "reviewDays", 1, 3650);
      }
      changes.add(
          Map.of(
              "id",
              id,
              "type",
              type,
              "changedFields",
              fields,
              "tightened",
              tightened,
              "before",
              a == null ? Map.of() : a,
              "after",
              b == null ? Map.of() : b));
    }
    return Map.of(
        "changes",
        changes,
        "changeCount",
        changes.size(),
        "reviewRequired",
        !changes.isEmpty(),
        "policyPublished",
        false);
  }
}
